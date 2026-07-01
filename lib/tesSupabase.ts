const testInsert = async () => {
    const response = await fetch(
        'https://dqjzjtzjddsjctklfjeo.supabase.co/rest/v1/visa_applications',
        {
            method: 'POST',
            headers: {
                'apikey': process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '',
                'Content-Type': 'application/json',
                'Prefer': 'return=representation',
            },
            body: JSON.stringify({
                full_name: 'Test User',
                email: 'test@example.com',
            }),
        }
    );
    console.log(await response.json());
};