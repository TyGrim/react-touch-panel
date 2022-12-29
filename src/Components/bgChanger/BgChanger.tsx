import { useState, useRef } from 'react';
import { Slider } from '@mui/material';
import Button from 'react-bootstrap/Button';
import "./bgChanger.css";
import { publishEvent } from "@crestron/ch5-crcomlib";

function BgChanger() {

const [color, setColor] = useState("253, 67, 67");
const [opacity, setOpacity] = useState(1);
const [backgroundColor, setBackgroundColor] = useState("rgba(253, 67, 67, 1");

const ref = useRef<HTMLDivElement>(null);

const changeBG = (el: HTMLDivElement, value: string) => {
    el.style.backgroundColor = backgroundColor;
    
}

if (null !== ref.current) {
    changeBG(ref.current, `${backgroundColor}`);
}

const setSliderValue = (value: number) => {
    setOpacity(value / 100);
    setBackgroundColor(`rgba(${color}, ${value / 100})`)
    publishEvent('n', "1", value); //analog join 1
    return `${value}`;
}

const setRedBackground = () => {
    setColor("253, 67, 67");
    setBackgroundColor(`rgba(235, 67, 67, ${opacity})`);
    publishEvent('b', "1", true);     //digital join 1 goes high
    publishEvent('b', "1", false);   //digital join 1 goes low
    console.log('Red button pressed');
};

const setGreenBackground = () => {
    setColor("132, 202, 19");
    setBackgroundColor(`rgba(132, 202, 19, ${opacity})`);
    publishEvent('b', "2", true);     //digital join 2 goes high
    publishEvent('b', "2", false);   //digital join 2 goes low
    console.log('Green button pressed');
};

const setYellowBackground = () => {
    setColor("232, 213, 44");
    setBackgroundColor(`rgba(232, 213, 44, ${opacity})`);
    publishEvent('b', "3", true);     //digital join 3 goes high
    publishEvent('b', "3", false);   //digital join 3 goes low
    console.log('Yellow button pressed');
};

return (
    
    <header className="App-header">
        <h1>
        React Touch Panel  
        </h1>
        <div ref={ref} className='ButtonList' >
        <p>
            Background Color
        </p>
        <Button className='Button' size="lg" variant='danger' onClick={() => setRedBackground()}>RED</Button>
        <Button className='Button' size="lg" variant='success' onClick={() => setGreenBackground()}>GREEN</Button>
        <Button className='Button' size="lg" variant='warning' onClick={() => setYellowBackground()}>YELLOW</Button>
        </div>
        <div className="Slider">
        <p>Opacity</p>
        <Slider sx={{width:800}} color="secondary" defaultValue={100} getAriaValueText={setSliderValue} />
        </div>
    </header>
    
    );
};


export default BgChanger;
