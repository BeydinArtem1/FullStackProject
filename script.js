let allValues = [];
let valueInput = '';
let valueSumm = null;
let input = null;
let summ = null;
let count = 0;

window.onload = init = () => {
    input = document.getElementById('input1');
    input.addEventListener('change', updateValue);
    summ = document.getElementById('input2');
    summ.addEventListener('change', updateSumm);
};

const updateValue = (event) => {
    valueInput = event.target.value;
};

const updateSumm = (event) => {
    valueSumm = event.target.value;
};

const getDay = () => {
    let day = new Date();
    const dd = String(day.getDate()).padStart(2, '0');
    const mm = String(day.getMonth() + 1).padStart(2, '0');
    const yyyy = day.getFullYear();
    day = dd + '.' + mm + '.' + yyyy;
    return day;
};

const onClickButton = () => {
    if (valueInput !== '' && valueSumm !== null && !isNaN(valueSumm)) {
        allValues.push({
            text: valueInput,
            summ: valueSumm,
            date: getDay()
        });
        valueInput = '';
        valueSumm = 0;
        input.value = '';
        summ.value = '';
        render();
    };
};

const render = () => {
    const content = document.getElementById('content');
    while (content.firstChild) {
        content.removeChild(content.firstChild);
    };
    allValues.map((item, index) => {
        let { text, date, summ } = item;
        const container = document.createElement('div');
        container.id = `value-${index}`;
        container.className = 'values-container';
        const num = document.createElement('p');
        num.innerText = `${index + 1})`
        container.appendChild(num);
        const textVal = document.createElement('p');
        textVal.innerText = text;
        textVal.id = 'text';
        container.appendChild(textVal);
        const dateVal = document.createElement('p');
        dateVal.innerText = date;
        dateVal.id = 'date';
        container.appendChild(dateVal);
        const summVal = document.createElement('p');
        summVal.innerText = `${summ} p.`;
        summVal.id = 'summ';
        container.appendChild(summVal);
        const imageEdit = document.createElement('i');
        imageEdit.className = 'far fa-edit';
        container.appendChild(imageEdit);
        const inputVal = document.createElement('input');
        inputVal.value = textVal.innerText;
        const inputSumm = document.createElement('input');
        inputSumm.value = summ;
        imageEdit.onclick = () => {
            imageEdit.className = 'far fa-check-square';
            imageDelete.className = 'fas fa-backspace';
            changeText(inputVal, textVal, container);
            changeText(inputSumm, summVal, container);
            imageEdit.onclick = () => {
                editVal(textVal, inputVal, container, inputSumm, summVal, item);
            };
            imageDelete.onclick = () => {
                render();
            };
        };
        const imageDelete = document.createElement('i');
        imageDelete.className = 'far fa-trash-alt';
        container.appendChild(imageDelete);
        imageDelete.onclick = () => {
            deleteVal(index);
        };
        content.appendChild(container);
        count = count + Number(item.summ);
    });
    counter();
};

const counter = () => {
    const countRender = document.getElementById('countOf');
    countRender.innerText = count;
    count = null;
};

const changeText = (input, text, container) => {
    container.replaceChild(input, text);
};

const editVal = (textVal, inputVal, container, inputSumm, summVal, item) => {
    if (!isNaN(inputSumm.value)) {
        textVal.innerText = inputVal.value;
        item.text = inputVal.value;
        container.replaceChild(textVal, inputVal);
        summVal.innerText = `${inputSumm.value} p.`;
        item.summ = inputSumm.value;
        container.replaceChild(summVal, inputSumm);
        render();
    } else {
        render();
    }
};

const deleteVal = (index) => {
    allValues = allValues.filter((item, index1) => (index1 !== index));
    render();
};