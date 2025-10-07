-- Hunaar Database Schema
-- This file contains all the SQL commands to set up the Supabase database

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create custom types
CREATE TYPE workflow_status AS ENUM ('draft', 'active', 'paused', 'archived');
CREATE TYPE trigger_type AS ENUM ('webhook', 'schedule', 'manual', 'email', 'form_submit');
CREATE TYPE step_type AS ENUM ('trigger', 'action', 'condition', 'delay');
CREATE TYPE execution_status AS ENUM ('pending', 'running', 'completed', 'failed', 'cancelled');
CREATE TYPE integration_type AS ENUM ('email', 'messaging', 'crm', 'storage', 'social', 'ecommerce', 'productivity', 'developer');

-- Create integrations table (available integrations)
CREATE TABLE integrations (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    type integration_type NOT NULL,
    description TEXT,
    icon_url TEXT,
    config JSONB DEFAULT '{}',
    auth_type VARCHAR(50) DEFAULT 'oauth2', -- oauth2, api_key, basic, none
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create user_integrations table (user's connected integrations)
CREATE TABLE user_integrations (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    integration_id UUID REFERENCES integrations(id) ON DELETE CASCADE,
    config JSONB DEFAULT '{}',
    credentials JSONB DEFAULT '{}', -- Encrypted in production
    status VARCHAR(20) DEFAULT 'connected',
    last_tested_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, integration_id)
);

-- Create workflows table
CREATE TABLE workflows (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    status workflow_status DEFAULT 'draft',
    trigger_type trigger_type NOT NULL,
    trigger_config JSONB DEFAULT '{}',
    is_active BOOLEAN DEFAULT false,
    last_run_at TIMESTAMP WITH TIME ZONE,
    total_runs INTEGER DEFAULT 0,
    successful_runs INTEGER DEFAULT 0,
    failed_runs INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create workflow_steps table
CREATE TABLE workflow_steps (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    workflow_id UUID REFERENCES workflows(id) ON DELETE CASCADE,
    integration_id UUID REFERENCES integrations(id),
    step_order INTEGER NOT NULL,
    step_type step_type NOT NULL,
    name VARCHAR(255) NOT NULL,
    configuration JSONB DEFAULT '{}',
    conditions JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create workflow_executions table
CREATE TABLE workflow_executions (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    workflow_id UUID REFERENCES workflows(id) ON DELETE CASCADE,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    status execution_status DEFAULT 'pending',
    trigger_data JSONB DEFAULT '{}',
    result JSONB DEFAULT '{}',
    error_message TEXT,
    started_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    completed_at TIMESTAMP WITH TIME ZONE,
    duration_ms INTEGER
);

-- Create execution_steps table (detailed step execution log)
CREATE TABLE execution_steps (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    execution_id UUID REFERENCES workflow_executions(id) ON DELETE CASCADE,
    step_id UUID REFERENCES workflow_steps(id) ON DELETE CASCADE,
    status execution_status DEFAULT 'pending',
    input_data JSONB DEFAULT '{}',
    output_data JSONB DEFAULT '{}',
    error_message TEXT,
    started_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    completed_at TIMESTAMP WITH TIME ZONE,
    duration_ms INTEGER
);

-- Create user_profiles table (extended user information)
CREATE TABLE user_profiles (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    full_name TEXT,
    avatar_url TEXT,
    company TEXT,
    website TEXT,
    plan VARCHAR(20) DEFAULT 'free', -- free, pro, enterprise
    usage_limit INTEGER DEFAULT 1000,
    usage_count INTEGER DEFAULT 0,
    usage_reset_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() + INTERVAL '1 month',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_workflows_user_id ON workflows(user_id);
CREATE INDEX idx_workflows_status ON workflows(status);
CREATE INDEX idx_workflow_steps_workflow_id ON workflow_steps(workflow_id);
CREATE INDEX idx_workflow_executions_workflow_id ON workflow_executions(workflow_id);
CREATE INDEX idx_workflow_executions_user_id ON workflow_executions(user_id);
CREATE INDEX idx_workflow_executions_status ON workflow_executions(status);
CREATE INDEX idx_user_integrations_user_id ON user_integrations(user_id);

-- Create updated_at triggers
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_integrations_updated_at BEFORE UPDATE ON integrations
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_integrations_updated_at BEFORE UPDATE ON user_integrations
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_workflows_updated_at BEFORE UPDATE ON workflows
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_workflow_steps_updated_at BEFORE UPDATE ON workflow_steps
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_profiles_updated_at BEFORE UPDATE ON user_profiles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Create RLS (Row Level Security) policies
ALTER TABLE workflows ENABLE ROW LEVEL SECURITY;
ALTER TABLE workflow_steps ENABLE ROW LEVEL SECURITY;
ALTER TABLE workflow_executions ENABLE ROW LEVEL SECURITY;
ALTER TABLE execution_steps ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_integrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

-- Workflows policies
CREATE POLICY "Users can view their own workflows" ON workflows
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own workflows" ON workflows
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own workflows" ON workflows
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own workflows" ON workflows
    FOR DELETE USING (auth.uid() = user_id);

-- Workflow steps policies
CREATE POLICY "Users can view steps of their workflows" ON workflow_steps
    FOR SELECT USING (
        workflow_id IN (
            SELECT id FROM workflows WHERE user_id = auth.uid()
        )
    );

CREATE POLICY "Users can create steps for their workflows" ON workflow_steps
    FOR INSERT WITH CHECK (
        workflow_id IN (
            SELECT id FROM workflows WHERE user_id = auth.uid()
        )
    );

CREATE POLICY "Users can update steps of their workflows" ON workflow_steps
    FOR UPDATE USING (
        workflow_id IN (
            SELECT id FROM workflows WHERE user_id = auth.uid()
        )
    );

CREATE POLICY "Users can delete steps of their workflows" ON workflow_steps
    FOR DELETE USING (
        workflow_id IN (
            SELECT id FROM workflows WHERE user_id = auth.uid()
        )
    );

-- User integrations policies
CREATE POLICY "Users can view their own integrations" ON user_integrations
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own integrations" ON user_integrations
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own integrations" ON user_integrations
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own integrations" ON user_integrations
    FOR DELETE USING (auth.uid() = user_id);

-- User profiles policies
CREATE POLICY "Users can view their own profile" ON user_profiles
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON user_profiles
    FOR UPDATE USING (auth.uid() = id);

-- Workflow executions policies
CREATE POLICY "Users can view their own executions" ON workflow_executions
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "System can create executions" ON workflow_executions
    FOR INSERT WITH CHECK (true);

-- Execution steps policies (read-only for users)
CREATE POLICY "Users can view execution steps of their workflows" ON execution_steps
    FOR SELECT USING (
        execution_id IN (
            SELECT id FROM workflow_executions WHERE user_id = auth.uid()
        )
    );

-- Create function to handle user profile creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.user_profiles (id, full_name)
    VALUES (NEW.id, NEW.raw_user_meta_data->>'full_name');
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user signup
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Insert sample integrations
INSERT INTO integrations (name, type, description, icon_url, auth_type) VALUES
    ('Gmail', 'email', 'Send and receive emails via Gmail', 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/gmail.svg', 'oauth2'),
    ('Slack', 'messaging', 'Send messages and notifications to Slack channels', 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/slack.svg', 'oauth2'),
    ('Google Sheets', 'productivity', 'Read and write data to Google Sheets', 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/googlesheets.svg', 'oauth2'),
    ('Webhooks', 'developer', 'Send HTTP requests to any URL', 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/webhook.svg', 'none'),
    ('Trello', 'productivity', 'Create and manage Trello cards and boards', 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/trello.svg', 'oauth2'),
    ('Discord', 'messaging', 'Send messages to Discord channels', 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/discord.svg', 'api_key'),
    ('Twitter', 'social', 'Post tweets and interact with Twitter API', 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/twitter.svg', 'oauth2'),
    ('Notion', 'productivity', 'Create and update Notion pages and databases', 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/notion.svg', 'oauth2'),
    ('Salesforce', 'crm', 'Manage Salesforce records and data', 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/salesforce.svg', 'oauth2'),
    ('Shopify', 'ecommerce', 'Manage Shopify store orders and products', 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/shopify.svg', 'api_key');