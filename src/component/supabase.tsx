import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://lailrxwkfemidbxazuom.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxhaWxyeHdrZmVtaWRieGF6dW9tIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTY2NTU3ODIsImV4cCI6MjAxMjIzMTc4Mn0.jXF8HZp0mU-D8REMFzrFMiU-EhZJI4fjozoVX-kbBaE';

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
