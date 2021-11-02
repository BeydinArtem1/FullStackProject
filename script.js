let allValues = [];
let valueInput = '';
let valueSumm = null;
let input = null;
let summ = null;
let count = 0;
let editValuesInInpits = {
  text: '',
  summ: 0,
  date: ''
};

window.onload = init = async () => {
  input = document.getElementById('input1');
  input.addEventListener('change', updateValue);
  summ = document.getElementById('input2');
  summ.addEventListener('change', updateSumm);
  const resp = await fetch('http://localhost:8000/getAll', {
    method: 'GET'
  });
  const result = await resp.json();
  allValues = result.data;
  render();
};

const updateValue = (event) => {
  valueInput = (event.target.value).trim();
};

const updateSumm = (event) => {
  valueSumm = (event.target.value).trim();
};
const getDate = () => {
  let today = new Date();
  const dd = String(today.getDate()).padStart(2, '0');
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const yyyy = today.getFullYear();
  today = dd + '.' + mm + '.' + yyyy;
  return today;
}

const onClickButton = async () => {
  if (valueInput.trim() && valueSumm && !isNaN(valueSumm)) {
    const resp = await fetch('http://localhost:8000/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        text: valueInput,
        summ: valueSumm,
        date: getDate()
      })
    });
    const result = await resp.json();
    allValues.push(result.data);
    valueInput = '';
    valueSumm = 0;
    input.value = '';
    summ.value = '';
    render();
  } else {
    console.log('field is invalid. please fill it correctly');
  }
};

const render = () => {
  const content = document.getElementById('content');
  while (content.firstChild) {
    content.removeChild(content.firstChild);
  };
  count = null;
  allValues.map((item, index) => {
    const { text, date, summ, _id } = item;
    const container = document.createElement('div');
    container.id = `value-${index}`;
    container.className = 'values-container';
    const num = document.createElement('p');
    num.innerText = `${index + 1})`;
    num.className = 'num';
    const textVal = document.createElement('p');
    textVal.innerText = text;
    textVal.id = 'text';
    const textDiv = document.createElement('div');
    textDiv.className = 'name-div';
    textDiv.appendChild(num);
    textDiv.appendChild(textVal);
    container.appendChild(textDiv);
    const dateVal = document.createElement('p');
    dateVal.innerText = date;
    dateVal.id = 'date';
    const summVal = document.createElement('p');
    summVal.innerText = `${summ} p.`;
    summVal.id = 'summ';
    const valuesDiv = document.createElement('div');
    valuesDiv.className = 'value-div';
    valuesDiv.appendChild(dateVal);
    valuesDiv.appendChild(summVal);
    container.appendChild(valuesDiv);
    const imageEdit = document.createElement('i');
    imageEdit.className = 'far fa-edit';
    const buttomsDiv = document.createElement('div');
    buttomsDiv.className = 'button-div';
    buttomsDiv.appendChild(imageEdit);
    textVal.ondblclick = () => {
      editValuesInInpits = item;
      const [inputVal, inputSumm, inputDate] = editElement(item);
      textDiv.replaceChild(inputVal, textVal);
      inputVal.focus();
      inputVal.onblur = () => saveChangesInShop(index);
    }
    summVal.ondblclick = () => {
      editValuesInInpits = item;
      const [inputVal, inputSumm, inputDate] = editElement(item);
      valuesDiv.replaceChild(inputSumm, summVal);
      inputSumm.focus();
      inputSumm.onblur = () => saveChangesInShop(index);
    }
    dateVal.ondblclick = () => {
      editValuesInInpits = item;
      const [inputVal, inputSumm, inputDate] = editElement(item);
      valuesDiv.replaceChild(inputDate, dateVal);
      inputDate.focus();
      inputDate.onblur = () => saveChangesInShop(index);
    }
    imageEdit.onclick = () => {
      editValuesInInpits = item;
      imageEdit.className = 'far fa-check-square';
      imageDelete.className = 'fas fa-backspace';
      const [inputVal, inputSumm, inputDate] = editElement(item);
      textDiv.replaceChild(inputVal, textVal);
      valuesDiv.replaceChild(inputDate, dateVal);
      valuesDiv.replaceChild(inputSumm, summVal);
      imageEdit.onclick = () => saveChangesInShop(index);
      imageDelete.onclick = () => render();
    }
    const imageDelete = document.createElement('i');
    imageDelete.className = 'far fa-trash-alt';
    buttomsDiv.appendChild(imageDelete);
    valuesDiv.appendChild(buttomsDiv);
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
  editValuesInInpits = { ...editValuesInInpits, [key]: (e.target.value).trim() };
}
  
const saveChangesInShop = async (index) => {
  const { _id, text, summ, date } = editValuesInInpits;
  if (text && summ && date) {
    const resp = await fetch(`http://localhost:8000/update`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        _id,
        text,
        summ,
        date: date.slice(0, 10).split('-').reverse().join('.')
      })
    });
    const result = await resp.json();
    allValues = result.data;
    render();
  } else {
    console.log('field is empty. please fill it');
  }
}

const counter = () => {
  const countRender = document.getElementById('countOf');
  countRender.innerText = count;
};

const deleteVal = async (index) => {
  const resp = await fetch(`http://localhost:8000/delete?_id=${allValues[index]._id}`, {
    method: 'DELETE',
  });
  const result = await resp.json();
  allValues = result.data;
  render();
};