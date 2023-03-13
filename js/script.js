const filterByType = (type, ...values) =>
    values.filter((value) => typeof value === type),
  /**функция  filterByType при вызове которой в 1 аргумент пераем тип данных и во второй аргумент любое кол-во данных, в теле
   * функции к массиву второго аргумента применяем
   * метод filter  и для каждого значения из массива определяем его typeof
   */
  hideAllResponseBlocks = () => {
    const responseBlocksArray = Array.from(
      document.querySelectorAll("div.dialog__response-block")
    );
    responseBlocksArray.forEach((block) => (block.style.display = "none"));
  },
  /** Вызывая функцию hideAllResponseBlocks мы получаем элементы ,в которых отображается ответ,
   * со страницы в массив и перебрав этот массив скрываем блоки
   */
  showResponseBlock = (blockSelector, msgText, spanSelector) => {
    hideAllResponseBlocks();
    document.querySelector(blockSelector).style.display = "block";
    if (spanSelector) {
      document.querySelector(spanSelector).textContent = msgText;
    }
  },
  /**Вызывая функцию showResponseBlock мы передадим аргументы blockSelector - блок, в который выведем ответ,
   * msgText - выводимый текст
   *spanSelector - элемент со страницы, в котором покажем ответ msgText
   перед выводом ответа вызовем функцию hideAllResponseBlocks, которая скроет блоки с предыдущими ответами, если такие были.
   */
  showError = (msgText) =>
    showResponseBlock(".dialog__response-block_error", msgText, "#error"), //функция для вывода в блок для ошибок dialog__response-block_error, текст с ошибкой msgText в элемент с id error
  showResults = (msgText) =>
    showResponseBlock(".dialog__response-block_ok", msgText, "#ok"), // функция для вывода результата фильтрации в блок .dialog__response-block_ok, текст с результатом msgText в элемент для вывод рещультат с id ok
  showNoResults = () => showResponseBlock(".dialog__response-block_no-results"), //если нет никаких данных, то в ответ покжет готовый блок с ответом: "Пока что нечего показать" из верстки
  tryFilterByType = (type, values) => {
    try {
      const valuesArray = eval(`filterByType('${type}', ${values})`).join(", ");
      const alertMsg = valuesArray.length
        ? `Данные с типом ${type}: ${valuesArray}`
        : `Отсутствуют данные типа ${type}`;
      showResults(alertMsg);
    } catch (e) {
      showError(`Ошибка: ${e}`);
    }
  };
/**функция tryFilterByType при ее вызове мы передаем аргументы в первый аргумент передем выбранный тип данных, во второй значения для поиска выбранного типа в теле функции используем конструктор try/catch и если у нас есть значения выбранного типа данных, то отработает блок try. В котором мы задаем переменную valuesArray и значением этой переменной будет результат
 * работы метода  eval, в котором вызываем функцию filterByType, который  выполнит строку кода и вернет результат последней инструкции, так если filterByType определит выбранный тип для отображения данных , и если есть такие данные в переданном массиве то выведет их из массива в строковом представлении, разделенные запятой благодаря использованию метода join. Этот результат мы будем передавать в значение созданной переменной
 * alertMsg и в зависимости от длины массива valuesArray используя условный опереатор ? мы пользовтелю покажем ответ данные с типом: укажем выбранный тип днных и и выведем значения таких данных из valuesArray либо укажет , что данные с выбранным типом отствуют и для вывода результата будет вызвана функция showResults в параметр которой мы отправим значение переменной  alertMsg
 * если же отработает блок catch, то мы вызваем функцию showError и показываем что за ошибка
 */
const filterButton = document.querySelector("#filter-btn"); // получение кнопки запуска фильтрации со страницы

filterButton.addEventListener("click", (e) => {
  //вешаем обработчик события клик
  const typeInput = document.querySelector("#type"); //получаем элемент со страницы, в котором указан список типа данных
  const dataInput = document.querySelector("#data"); //получаем элемент со страницы, в который пользователь вводит информцию
  if (dataInput.value === "") {
    //если значение dataInput пустое
    dataInput.setCustomValidity("Поле не должно быть пустым!"); //используем метод setCustomValidity, который вывводит пользовательское сообщение
    showNoResults(); // вызываем функцию для отображения результата фильтрации
  } else {
    // если поле dataInput имеет не пустое значение
    dataInput.setCustomValidity(""); // удаляем пользовательское сообщение
    e.preventDefault(); // отменяем действие события по умолчанию
    tryFilterByType(typeInput.value.trim(), dataInput.value.trim()); //запускаем нашу функцию tryFilterByType, в первый аргумент которой мы передадим value typeInput, так как каждый элемент из списка имеет свой value. А во второй аргумент мы передадим value из инпута  dataInput предварительно применив к этим значениям метод trim(), который удалит пробелы с начала и в конце строки
  }
});
