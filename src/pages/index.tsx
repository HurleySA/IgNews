import { GetStaticProps } from "next";
import Head from "next/head";
import { SubscribeButton } from "../components/SubscribeButton";
import { stripe } from "../services/stripe";
import Image from 'next/image'
import styles from "./home.module.scss"

interface HomeProps {
  product: {
    priceId: String,
    amount: number,
  }
}
export default function Home({product}: HomeProps) {
    return (
      <>
       <Head>
         <title>Inicio - Ignews</title>
       </Head>

       <main className={styles.contentContainer}>
         <section className={styles.hero}>
           <span>👏 Hey, Welcome</span>
           <h1>News about the <span>React</span> world.</h1>
           <p>
             Get acess to all the publications <br/>
             <span>For {product.amount} month</span>
           </p>
           <SubscribeButton priceId={product.priceId}/>
         </section>
         <Image src="/images/avatar.svg" alt="Garota Codando" width={336} height={521}/>
       </main>
      </>
    )
  }

  export const getStaticProps: GetStaticProps = async () =>{
    const price = await stripe.prices.retrieve("price_1JjkK1AERVbKXB5ZYbzNJwJ5", {
      expand:['product']
    })

    const product = {
      priceId: price.id,
      amount: new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(price.unit_amount / 100),
    }

    return {
      props:{
        product
      },
      revalidate: 60 * 60 *24,

    }
  }
  