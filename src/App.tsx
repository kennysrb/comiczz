import { useState } from "react";
import { ComicsPage } from "./pages/ComicsPage";
import { Header } from "./components/Header/Header";
import { Breadcrumbs } from "./components/BreadCrumbs/Breadcrumbs";

function App() {
  const [format, setFormat] = useState<string>("All");

  return (
    <>
      <Header selectedFormat={format} onSelectFormat={setFormat} />
      <Breadcrumbs format={format} onHomeClick={() => setFormat("All")} />
      <ComicsPage format={format} />
    </>
  );
}

export default App;
