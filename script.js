let allValues = [];
let valueInput = '';
let valueSumm = null;
let input = null;
let summ = null;
let count = 0;
let editValuesInInpits = {
  text: '',
  summ: null,
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
  let result = await resp.json();
  allValues = result.data;
  render();
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

const onClickButton = async () => {
  if (valueInput !== '' && valueSumm !== null && !isNaN(valueSumm)) {
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
    valueSumm = null;
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
    summVal.id = 'summ';
    container.appendChild(summVal);
    const imageEdit = document.createElement('i');
    imageEdit.className = 'far fa-edit';
    container.appendChild(imageEdit);
    editValuesInInpits = item;
    textVal.ondblclick = () => {
      const [inputVal, inputSumm, inputDate] = editElement(item);
      container.replaceChild(inputVal, textVal);
      inputVal.focus();
      inputVal.onblur = () => saveOneElem(index, 'text');
    }
    summVal.ondblclick = () => {
      const [inputVal, inputSumm, inputDate] = editElement(item);
      container.replaceChild(inputSumm, summVal);
      inputSumm.focus();
      inputSumm.onblur = () => saveOneElem(index, 'summ');
    }
    dateVal.ondblclick = () => {
      const [inputVal, inputSumm, inputDate] = editElement(item);
      container.replaceChild(inputDate, dateVal);
      inputDate.focus();
      inputDate.onblur = () => saveOneElem(index, 'date');
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

const saveChangesInShop = async (index) => {
  const { text, summ, date } = editValuesInInpits;

  if (text !== '' && summ !== 0 && date !== '') {
  const resp = await fetch(`http://localhost:8000/update`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify({
      _id: allValues[index]._id,
      text,
      summ,
      date: date.slice(0, 10).split('-').reverse().join('.')
    })
  });
  const result = await resp.json();
  allValues = result.data; 
  render();
  } else {
    alert('field is empty. please fill it');
  }
}

const saveOneElem = async (index, key) => {
  const { text, summ, date } = editValuesInInpits;
  if (text !== '' && summ !== 0 && date !== '') {
    if (key === 'date') {
      const resp = await fetch(`http://localhost:8000/update`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({
          _id: allValues[index]._id,          
          date: date.slice(0, 10).split('-').reverse().join('.')
        })
      });
      const result = await resp.json();
      allValues = result.data;
    } else {
      const resp = await fetch(`http://localhost:8000/update`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({
          _id: allValues[index]._id,
          text,
          summ          
        })
      });
      const result = await resp.json();
      allValues = result.data;
    }
    render();
  } else {
    alert('field is empty. please fill it');
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