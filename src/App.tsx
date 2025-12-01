import { Route, Routes } from "react-router-dom";

import AboutPage from "@/pages/about";
import BlogPage from "@/pages/blog";
import DocsPage from "@/pages/docs";
import IndexPage, { indexTabs } from "@/pages/index";
import PricingPage from "@/pages/pricing";

const iteraterFunc = (tab: any, idx: number) => <Route index={idx === 0} key={idx} path={tab.href} element={<tab.Component />} />;


function App() {
  return (
    <Routes>
      <Route element={<IndexPage />} path="/">
        {indexTabs.map(iteraterFunc)}
      </Route>
      <Route element={<DocsPage />} path="/docs" />
      <Route element={<PricingPage />} path="/pricing" />
      <Route element={<BlogPage />} path="/blog" />
      <Route element={<AboutPage />} path="/about" />
    </Routes>
  );
}

export default App;
