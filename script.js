let allValues = [];
let valueInput = '';
let valueSumm = 0;
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


const onClickButton = () => {
  allValues.push({
    text: valueInput,
    summ: valueSumm,
    date: '101010'
  });
  valueInput = '';
  valueSumm = 0;
  input.value = '';
  summ.value = '';
  render();
};

const render = () => {
  const content = document.getElementById('content');
  while (content.firstChild) {
    content.removeChild(content.firstChild);
  };
  allValues.map((item, index) => {
    const container = document.createElement('div');
    container.id = `value-${index}`;
    container.className = 'values-container';
    const num = document.createElement('p');
    num.innerText = `${index + 1})`
    container.appendChild(num);
    const text = document.createElement('p');
    text.innerText = item.text;
    container.appendChild(text);
    const date = document.createElement('p');
    date.innerText = item.date;
    container.appendChild(date);
    const summ = document.createElement('p');
    summ.innerText = `${item.summ} p.`;
    container.appendChild(summ);
    const imageEdit = document.createElement('i');
    imageEdit.className = 'far fa-edit';
    container.appendChild(imageEdit);
    const imageDelete = document.createElement('i');
    imageDelete.className = 'far fa-trash-alt';
    container.appendChild(imageDelete);
    content.appendChild(container);
    count = count + Number(item.summ);
  })
  const countRender = document.getElementById('countOf');
  countRender.innerText = count;
  count = 0;
}