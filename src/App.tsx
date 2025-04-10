import { useState } from "react";
import { ComicsPage } from "./pages/ComicsPage";
import { Header } from "./components/Header/Header";
import { Breadcrumbs } from "./components/BreadCrumbs/Breadcrumbs";

function App() {
  const [format, setFormat] = useState<string>("All");
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <>
      <Header selectedFormat={format} onSelectFormat={setFormat} />
      {!loading && (
        <Breadcrumbs format={format} onHomeClick={() => setFormat("All")} />
      )}
      <ComicsPage format={format} loading={loading} setLoading={setLoading} />
    </>
  );
}

export default App;
