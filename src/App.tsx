import { MouseEvent } from "react";
import Button from "./components/Button/Button";
import Input from "./components/Input/Input";

function App() {
    const addCounter = (e: MouseEvent) => {
        console.log(e);
    };

    return (
        <>
            <Button onClick={addCounter}>Knopka</Button>
            <Button appearence="big" onClick={addCounter}>
                Knopka2
            </Button>
            <Input className="" placeholder="Email" />
        </>
    );
}

export default App;
