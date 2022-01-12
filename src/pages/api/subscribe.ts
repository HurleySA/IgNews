import { Casefold, Collection, Get, Index, Match, Ref, Update } from "faunadb";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { fauna } from "../../services/fauna";
import { stripe } from "../../services/stripe";

interface User{
    ref:{
        id:string,
    },
    data:{
        stripe_customer_id:string,
    }
}

export default async (request: NextApiRequest, response: NextApiResponse ) =>{
    if(request.method === 'POST'){
        const session = await getSession({ req: request });

        const user = await fauna.query<User>(Get(Match(Index('user_by_email'), Casefold(session.user.email))))

        let customerId = user.data.stripe_customer_id;
        
        if(!customerId){
            const stripeCustomer = await stripe.customers.create({
                email: session.user.email,
                
            })

            await fauna.query(Update(Ref(Collection('users'), user.ref.id), { data:{ stripe_customer_id: stripeCustomer.id}}))

            customerId = stripeCustomer.id;
        }

        

       
        const checkoutSession = await stripe.checkout.sessions.create({
            customer: customerId,
            payment_method_types: ['card'],
            billing_address_collection: 'required',
            line_items: [
                {price: "price_1JjkK1AERVbKXB5ZYbzNJwJ5", quantity: 1}
            ],
            mode: 'subscription',
            allow_promotion_codes: true,
            success_url: process.env.STRIPE_SUCCESS_URL,
            cancel_url: process.env.STRIPE_CANCEL_URL,
        }) 

        return response.status(200).json({sessionId: checkoutSession.id})
    } else{
        response.setHeader('Allow', 'POST');
        response.status(405).end('Method not allowed')
    }
}
