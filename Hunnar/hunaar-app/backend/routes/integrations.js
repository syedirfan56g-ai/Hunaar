const express = require('express');
const { supabaseAdmin } = require('../config/supabase');

const router = express.Router();

// Get all available integrations
router.get('/', async (req, res) => {
  try {
    const { data: integrations, error } = await supabaseAdmin
      .from('integrations')
      .select('*')
      .order('name');

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.json({ integrations });

  } catch (error) {
    console.error('Get integrations error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get user's connected integrations
router.get('/connected', async (req, res) => {
  try {
    const userId = req.user.id;

    const { data: connections, error } = await supabaseAdmin
      .from('user_integrations')
      .select(`
        *,
        integrations (
          id, name, type, icon_url, description
        )
      `)
      .eq('user_id', userId);

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.json({ connections });

  } catch (error) {
    console.error('Get connected integrations error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Connect an integration
router.post('/connect/:integrationId', async (req, res) => {
  try {
    const { integrationId } = req.params;
    const { config, credentials } = req.body;
    const userId = req.user.id;

    // Check if integration exists
    const { data: integration, error: integrationError } = await supabaseAdmin
      .from('integrations')
      .select('*')
      .eq('id', integrationId)
      .single();

    if (integrationError || !integration) {
      return res.status(404).json({ error: 'Integration not found' });
    }

    // Create user integration connection
    const { data: connection, error } = await supabaseAdmin
      .from('user_integrations')
      .insert({
        user_id: userId,
        integration_id: integrationId,
        config: config || {},
        credentials: credentials || {}, // In production, encrypt these
        status: 'connected'
      })
      .select(`
        *,
        integrations (
          id, name, type, icon_url, description
        )
      `)
      .single();

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.status(201).json({ connection });

  } catch (error) {
    console.error('Connect integration error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Disconnect an integration
router.delete('/disconnect/:connectionId', async (req, res) => {
  try {
    const { connectionId } = req.params;
    const userId = req.user.id;

    const { error } = await supabaseAdmin
      .from('user_integrations')
      .delete()
      .eq('id', connectionId)
      .eq('user_id', userId);

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.json({ message: 'Integration disconnected successfully' });

  } catch (error) {
    console.error('Disconnect integration error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Test an integration connection
router.post('/test/:connectionId', async (req, res) => {
  try {
    const { connectionId } = req.params;
    const userId = req.user.id;

    const { data: connection, error } = await supabaseAdmin
      .from('user_integrations')
      .select(`
        *,
        integrations (name, type)
      `)
      .eq('id', connectionId)
      .eq('user_id', userId)
      .single();

    if (error || !connection) {
      return res.status(404).json({ error: 'Connection not found' });
    }

    // Here you would implement actual integration testing
    // For demo purposes, we'll simulate a successful test
    const testResult = {
      success: true,
      message: `${connection.integrations.name} connection is working properly`,
      tested_at: new Date().toISOString()
    };

    res.json({ test_result: testResult });

  } catch (error) {
    console.error('Test integration error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;