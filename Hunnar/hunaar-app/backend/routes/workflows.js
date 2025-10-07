const express = require('express');
const { body, validationResult } = require('express-validator');
const { supabaseAdmin } = require('../config/supabase');

const router = express.Router();

// Get all workflows for the authenticated user
router.get('/', async (req, res) => {
  try {
    const userId = req.user.id;

    const { data: workflows, error } = await supabaseAdmin
      .from('workflows')
      .select(`
        *,
        workflow_steps (
          id,
          step_order,
          step_type,
          configuration,
          integration_id,
          integrations (name, type, icon_url)
        )
      `)
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.json({ workflows });

  } catch (error) {
    console.error('Get workflows error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get a specific workflow
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const { data: workflow, error } = await supabaseAdmin
      .from('workflows')
      .select(`
        *,
        workflow_steps (
          id,
          step_order,
          step_type,
          configuration,
          integration_id,
          integrations (name, type, icon_url)
        )
      `)
      .eq('id', id)
      .eq('user_id', userId)
      .single();

    if (error) {
      return res.status(404).json({ error: 'Workflow not found' });
    }

    res.json({ workflow });

  } catch (error) {
    console.error('Get workflow error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create a new workflow
router.post('/',
  [
    body('name').isLength({ min: 1 }).trim(),
    body('description').optional().trim(),
    body('trigger_type').isIn(['webhook', 'schedule', 'manual', 'email']),
    body('trigger_config').isObject()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { name, description, trigger_type, trigger_config } = req.body;
      const userId = req.user.id;

      const { data: workflow, error } = await supabaseAdmin
        .from('workflows')
        .insert({
          user_id: userId,
          name,
          description,
          trigger_type,
          trigger_config,
          status: 'draft'
        })
        .select()
        .single();

      if (error) {
        return res.status(400).json({ error: error.message });
      }

      res.status(201).json({ workflow });

    } catch (error) {
      console.error('Create workflow error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
);

// Update a workflow
router.put('/:id',
  [
    body('name').optional().isLength({ min: 1 }).trim(),
    body('description').optional().trim(),
    body('status').optional().isIn(['draft', 'active', 'paused'])
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { id } = req.params;
      const userId = req.user.id;
      const updates = req.body;

      const { data: workflow, error } = await supabaseAdmin
        .from('workflows')
        .update({
          ...updates,
          updated_at: new Date().toISOString()
        })
        .eq('id', id)
        .eq('user_id', userId)
        .select()
        .single();

      if (error) {
        return res.status(400).json({ error: error.message });
      }

      res.json({ workflow });

    } catch (error) {
      console.error('Update workflow error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
);

// Delete a workflow
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const { error } = await supabaseAdmin
      .from('workflows')
      .delete()
      .eq('id', id)
      .eq('user_id', userId);

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.json({ message: 'Workflow deleted successfully' });

  } catch (error) {
    console.error('Delete workflow error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Execute a workflow (trigger manually)
router.post('/:id/execute', async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    // Get workflow with steps
    const { data: workflow, error: fetchError } = await supabaseAdmin
      .from('workflows')
      .select(`
        *,
        workflow_steps (
          id,
          step_order,
          step_type,
          configuration,
          integration_id,
          integrations (name, type, config)
        )
      `)
      .eq('id', id)
      .eq('user_id', userId)
      .single();

    if (fetchError || !workflow) {
      return res.status(404).json({ error: 'Workflow not found' });
    }

    // Log execution
    const { data: execution, error: logError } = await supabaseAdmin
      .from('workflow_executions')
      .insert({
        workflow_id: id,
        user_id: userId,
        status: 'running',
        started_at: new Date().toISOString()
      })
      .select()
      .single();

    if (logError) {
      console.error('Failed to log execution:', logError);
    }

    // Here you would implement the actual workflow execution logic
    // For now, we'll just simulate a successful execution
    setTimeout(async () => {
      await supabaseAdmin
        .from('workflow_executions')
        .update({
          status: 'completed',
          completed_at: new Date().toISOString(),
          result: { message: 'Workflow executed successfully (simulated)' }
        })
        .eq('id', execution.id);
    }, 1000);

    res.json({
      message: 'Workflow execution started',
      execution_id: execution.id,
      workflow: workflow.name
    });

  } catch (error) {
    console.error('Execute workflow error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;