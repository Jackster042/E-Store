import { Button } from "./components/ui/button";

const App = () => {
  return (
    <main className="flex flex-col gap-4 items-center justify-center h-screen">
      <h1 className="text-3xl font-bold">Hello World</h1>

      <Button className="hover:bg-white hover:text-black hover:transition-all duration-500">
        Click me
      </Button>
    </main>
  );
};

export default App;
