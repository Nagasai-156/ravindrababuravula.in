import React, { useState } from 'react';
import { supabase } from './supabaseClient';

export default function TestSupabase() {
    const [result, setResult] = useState('');
    const [loading, setLoading] = useState(false);

    const testConnection = async () => {
        setLoading(true);
        try {
            console.log('Testing Supabase connection...');

            // Test 1: Basic connection
            const { data, error } = await supabase
                .from('internship_applications')
                .select('count', { count: 'exact' });

            if (error) {
                setResult(`Connection Error: ${error.message}`);
                console.error('Connection test failed:', error);
            } else {
                setResult(`Connection Success! Table has ${data.length} records`);
                console.log('Connection test successful:', data);
            }
        } catch (error) {
            setResult(`Network Error: ${error.message}`);
            console.error('Network error:', error);
        }
        setLoading(false);
    };

    return (
        <div style={{ padding: '20px', background: '#f0f0f0', margin: '20px', borderRadius: '8px' }}>
            <h3>Supabase Connection Test</h3>
            <button onClick={testConnection} disabled={loading}>
                {loading ? 'Testing...' : 'Test Connection'}
            </button>
            {result && (
                <div style={{ marginTop: '10px', padding: '10px', background: '#fff', borderRadius: '4px' }}>
                    {result}
                </div>
            )}
        </div>
    );
}