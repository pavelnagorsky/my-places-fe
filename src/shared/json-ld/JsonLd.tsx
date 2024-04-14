import Head from "next/head";

const JsonLd = ({ data }: { data: object }) => (
  <Head>
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  </Head>
);

export default JsonLd;
