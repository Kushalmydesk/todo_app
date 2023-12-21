import Head from 'next/head'
import Form from './components/Form'
import styles from '../styles/app.module.css'


const Home = () => {
  return (
    <div className={styles.App}>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
        <title>Do Tasks</title>
        
      </Head>

      <Form/>
    
    </div>
  )
}


export default Home;
