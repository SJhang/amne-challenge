window.onload = () => {
  const inputFile = document.querySelector('.fileInput');
  const resultsDisplay = document.querySelector('.results');
  const resultPanel = document.querySelector('.panel-default');

  inputFile.addEventListener('change', e => {
    const file = inputFile.files[0];
    const fileTypeRegex = /text.*/;

    if (file.type.match(fileTypeRegex)) {
      // FileReader over XMLHttpRequest to create a virtual file
      // that can be used in DOM format.
      let reader = new FileReader();

      const inputValues = document.createElement('div');
      inputValues.setAttribute('class', 'panel-footer inputValues');
      if (inputFile.nextElementSibling) {
        inputFile.nextElementSibling.remove();
      };
      inputFile.insertAdjacentElement('afterend', inputValues);


      reader.onloadend = e => {
        resultsDisplay.innerText = '';
        inputValues.innerText = e.target.result;
        const firstLine = e.target.result.split('\n')[0].split(' ');
        const secondLine = e.target.result.split('\n')[1];

        let daysOfHomeSalePrice = firstLine[0];
        let fixedWindowSize = firstLine[1];
        let windows = daysOfHomeSalePrice - fixedWindowSize + 1;

        const fixedWindows = secondLine.split(' ');

        if (daysOfHomeSalePrice <= 20000 && fixedWindowSize <= daysOfHomeSalePrice) {
          fixedWindows.forEach(item => {
            resultsDisplay.innerText = 'hello world';
          })
        } else {
          resultsDisplay.innerText = 'Invalid inputs';
        }
        debugger;
      }

      reader.readAsText(file);
    }
    // debugger;
  })
}
