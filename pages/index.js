import MeetupList from "../components/meetups/MeetupList";
import { MongoClient } from "mongodb";
import Head from "next/head";

const HomePage = (props) => {
  return (
    <>
      <Head>
        <title>React Meetups</title>
        <meta
          name="description"
          content="Browse a huge list of highly active React meetups"
        />
      </Head>
      <MeetupList meetups={props.meetups} />
    </>
  );
};

// if server changes very fast
// export async function getServerSideProps(context) {
//   const req = context.req;
//   const res = context.res;
// fetch data from an API
//   return {
//     props: {
//       meetups: DUMMY_MEETUPS,
//     },
//   };
// }

// if server does not change often
export async function getStaticProps() {
  const client = await MongoClient.connect(
    "mongodb+srv://iammardonbek:(Mardon090599)@cluster0.mc3jmbu.mongodb.net/meetups=true&w=majority"
  );
  const db = client.db();
  const meetupsCollection = db.collection("meetups");
  const meetups = await meetupsCollection.find().toArray();
  client.close();
  return {
    props: {
      meetups: meetups.map((v) => ({
        title: v.title,
        image: v.image,
        address: v.address,
        id: v._id.toString(),
      })),
    },
    revalidate: 1,
  };
}

export default HomePage;
