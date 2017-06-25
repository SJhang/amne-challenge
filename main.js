window.onload = () => {
  const inputFile = document.querySelector('.fileInput');
  const resultsDisplay = document.querySelector('.results');
  const resultPanel = resultsDisplay.parentNode;

  const getFixedWindow = (windowSize, targetSizeWindow, salesPriceList) => {
    const totalWindowList = [];
    for (var i = 0; i < targetSizeWindow; i++) {
      totalWindowList.push(salesPriceList.slice(i, i + windowSize));
    }
    return totalWindowList;
  };

  const subrangeNumber = (targetSizeWindow) => {
    let subrangeResult = 0;
    for (var i = 0; i < targetSizeWindow.length; i++) {
      if (targetSizeWindow[i] < targetSizeWindow[i + 1]) {
        subrangeResult++;
      } else if (targetSizeWindow[i] > targetSizeWindow[i + 1]) {
        subrangeResult--;
      }
    }

    let isAscending = targetSizeWindow.every((item, idx, arr) => {
      return arr[idx + 1] === undefined ? item : item < arr[idx + 1]
    });
    if (isAscending) subrangeResult++;
    return subrangeResult;
  };

  inputFile.addEventListener('change', e => {
    const file = inputFile.files[0];
    const fileTypeRegex = /text.*/;
    resultPanel.classList.value = 'panel panel-default';

    if (file.type.match(fileTypeRegex)) {
      // FileReader over XMLHttpRequest to create a virtual file
      // that can be used in DOM format.
      let reader = new FileReader();

      // create a display element for input file
      const inputValues = document.createElement('div');
      inputValues.setAttribute('class', 'panel-footer inputValues');
      if (inputFile.nextElementSibling) {
        inputFile.nextElementSibling.remove();
      };
      inputFile.insertAdjacentElement('afterend', inputValues);

      // once loading ends
      reader.onloadend = e => {
        resultsDisplay.innerText = '';
        inputValues.innerText = e.target.result;
        const firstLineInput = e.target.result.split('\n')[0].split(' ');
        const secondLineInput = e.target.result.split('\n')[1].split(' ');

        let daysOfHomeSalePrice = parseInt(firstLineInput[0]);
        let fixedWindowSize = parseInt(firstLineInput[1]);
        let windows = daysOfHomeSalePrice - fixedWindowSize + 1;

        const fixedWindows = getFixedWindow(fixedWindowSize, windows, secondLineInput);
        if (daysOfHomeSalePrice <= 200000 && fixedWindowSize <= daysOfHomeSalePrice) {
          resultPanel.classList.remove('panel-default');
          resultPanel.classList.add('panel-success');

          fixedWindows.forEach(item => {
            resultsDisplay.innerText += `${subrangeNumber(item)} \n`;
          });
        } else {
          resultsDisplay.innerText = 'Invalid Inputs';
          resultPanel.classList.remove('panel-default');
          resultPanel.classList.add('panel-danger');
        }
      }
      reader.readAsText(file);
    } else {
      console.log('Cancelled file select');
    }
  })
}
