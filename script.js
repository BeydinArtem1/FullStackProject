let allValues = [];
let valueInput = '';
let valueSumm = null;
let input = null;
let summ = null;
let count = 0;
let editValuesInInpits = {
  text: '',
  summ: 0
};

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
const getDate = () => {
  let today = new Date();
  const dd = String(today.getDate()).padStart(2, '0');
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const yyyy = today.getFullYear();
  today = dd + '.' + mm + '.' + yyyy;
  return today;
}



const onClickButton = () => {
  if (valueInput !== '' && valueSumm !== null && !isNaN(valueSumm)) {
    allValues.push({
      text: valueInput,
      summ: valueSumm,
      date: getDate()
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
  count = null;
  allValues.map((item, index) => {
    const { text, date, summ } = item;
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
    summVal.id ='summ';
    container.appendChild(summVal);
    const imageEdit = document.createElement('i');
    imageEdit.className = 'far fa-edit';
    container.appendChild(imageEdit);
    editValuesInInpits = item;
    textVal.ondblclick = () => {
      const [inputVal, inputSumm, inputDate] = editElement(item);
      container.replaceChild(inputVal, textVal);
      inputVal.focus();
      inputVal.onblur = () => {
        saveOneElem(index, 'text');
      }
    }
    summVal.ondblclick = () => {
      const [inputVal, inputSumm, inputDate] = editElement(item);
      container.replaceChild(inputSumm, summVal);
      inputSumm.focus();
      inputSumm.onblur = () => {
        saveOneElem(index, 'summ');
      }
    }
    dateVal.ondblclick = () => {
      const [inputVal, inputSumm, inputDate] = editElement(item);
      container.replaceChild(inputDate, dateVal);
      inputDate.focus();
      inputDate.onblur = () => {
        saveOneElem(index, 'date');
      }
    }
    imageEdit.onclick = () => {
      
      imageEdit.className = 'far fa-check-square';
      imageDelete.className = 'fas fa-backspace';
      const [inputVal, inputSumm, inputDate] = editElement(item);
      container.replaceChild(inputVal, textVal);
      container.replaceChild(inputDate, dateVal);
      container.replaceChild(inputSumm, summVal);
      imageEdit.onclick = () => saveChangesInShop(index);
      imageDelete.onclick = () => render();
    }
    const imageDelete = document.createElement('i');
    imageDelete.className = 'far fa-trash-alt';
    container.appendChild(imageDelete);
    imageDelete.onclick = () => {
      deleteVal(index);
    }
    content.appendChild(container);
    count = count + Number(item.summ);
  });
  counter();
}

const editElement = (item) => {
  const { text, summ, date } = item;
  const inputVal = document.createElement('input');
  inputVal.value = text;
  inputVal.onchange = (e) => handleChangeNameShop(e, 'text');
  const inputSumm = document.createElement('input');
  inputSumm.type = 'number';
  inputSumm.value = summ;
  inputSumm.onchange = (e) => handleChangeNameShop(e, 'summ');
  const inputDate = document.createElement('input');
  inputDate.value = date;
  inputDate.type = 'date';
  inputDate.onchange = (e) => handleChangeNameShop(e, 'date');
  return [inputVal, inputSumm, inputDate];
}

const handleChangeNameShop = (e, key) => {
  editValuesInInpits = { ...editValuesInInpits, [key]: e.target.value };
}

const saveChangesInShop = (index) => {
  const { text, summ, date } = editValuesInInpits;
  if (text !== '' && summ !== 0 && date !== '') {
    allValues[index] = { ...allValues[index], text, summ, date: date.slice(0, 10).split('-').reverse().join('.') };
    render();
  } else {
    alert('error');
  }
}

const saveOneElem = (index, key) => {
  const { text, summ, date } = editValuesInInpits;
  if (text !== '' || summ !== 0 || date !== '') {
    switch (key) {
      case 'date':
        allValues[index] = { ...allValues[index], [key]: date.slice(0, 10).split('-').reverse().join('.') };
        break;
      default:
        allValues[index] = { ...allValues[index], [key]: editValuesInInpits[key] };
    }
    render();
  } else {
    alert(key, 'undefined');
  }
}
const counter = () => {
  const countRender = document.getElementById('countOf');
  countRender.innerText = count;
};

const deleteVal = (index) => {
  allValues = allValues.filter((item, index1) => (index1 !== index));
  render();
};