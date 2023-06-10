import ConvertForm from "@/components/ConvertForm";
import Layout from "@/layouts/Layout";

export default function Home() {
  return (
    <Layout>
      <header className="mb-4 w-fit">
        <h1 className="text-4xl">
          Welcome to{" "}
          <span className="text-5xl font-black text-primary">
            Image Converter
          </span>
        </h1>
      </header>
      <section className="w-full md:max-w-2xl">
        <ConvertForm />
      </section>
      <footer />
    </Layout>
  );
}
