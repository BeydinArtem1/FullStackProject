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

const getDay = () => {
  let day = new Date();
  let dd = String(day.getDate()).padStart(2, '0');
  let mm = String(day.getMonth() + 1).padStart(2, '0');
  let yyyy = day.getFullYear();
  day = dd + '.' + mm + '.' + yyyy;
  return day;
}

const onClickButton = () => {
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
    imageEdit.onclick = () => {
      imageEdit.className = 'far fa-check-square';
      imageDelete.className = 'fas fa-backspace';
      const inputVal = document.createElement('input');
      inputVal.value = text.innerText;
      container.replaceChild(inputVal, text);
      const inputSumm = document.createElement('input');
      inputSumm.value = item.summ;
      container.replaceChild(inputSumm, summ);
      imageEdit.onclick = () => {
        editVal(text, inputVal, container, inputSumm, summ, item);
      }
      imageDelete.onclick = () => {
        render();
      }
    }
    const imageDelete = document.createElement('i');
    imageDelete.className = 'far fa-trash-alt';
    container.appendChild(imageDelete);
    imageDelete.onclick = () => {
      deleteVal(index);
    }
    content.appendChild(container);
    count = count + Number(item.summ);
  })
  const countRender = document.getElementById('countOf');
  countRender.innerText = count;
  count = 0;
}

const editVal = (text, inputVal, container, inputSumm, summ, item) => {
  text.innerText = inputVal.value;
  item.text = inputVal.value;
  container.replaceChild(text, inputVal);
  summ.innerText = `${inputSumm.value} p.`;
  item.summ = inputSumm.value;
  container.replaceChild(summ, inputSumm);
  render();
}

const deleteVal = (index) => {
  allValues = allValues.filter((item, index1) => (index1 !== index));
  render();
};

