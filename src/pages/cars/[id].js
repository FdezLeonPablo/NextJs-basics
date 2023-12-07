import { useRouter } from "next/router";

import Head from 'next/head'

export default function Car({ car }) {

    const router = useRouter()
    const {id} = router.query

    return (<>
        <Head>
            <title>{car.color} {car.id}</title>
        </Head>
        <h1>Hello {id}</h1>
        <img src={car.image} width="300px" />
    </>);
}

export async function getStaticProps({ params }) {
    const res = await fetch(`http://localhost:3000/${params.id}.json`);
    const car = await res.json();

    return { props: { car } };
}




export async function getStaticPaths() {
    const res = await fetch('http://localhost:3000/cars.json');
    const carIds = await res.json();

    const paths = carIds.map(id => ({
        params: { id },
    }));

    return { paths, fallback: false };
}

