// 'use server';

// import { cookies } from 'next/headers';
// import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
// import { Database } from '../../../../lib/supabase'; 

// export async function getCurrentUser() {
//   const supabase = createServerComponentClient<Database>({ cookies });

//   const {
//     data: { user },
//     error,
//   } = await supabase.auth.getUser();

//   if (error) {
//     console.error('Error fetching user:', error.message);
//     return null;
//   }

//   return user;
// }
