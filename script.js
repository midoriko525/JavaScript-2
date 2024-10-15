// 変数宣言
// HTMLの<div>を参照する
//電卓のディスプレイ部分（液晶）
//getElementByIDメソッドで特定IDを持つHTML要素にアクセスする
let display = document.getElementById("display");

// valueをdisplayに追加する
// last charで最後の文字を取得
function appendToDisplay(value) {
  const lastChar = display.value[display.value.length - 1];

  // 連続した演算子の入力を出来ないようにする
  //const operatorsは演算子を配列にまとめる
  //現在演算子を入力している場合、関数を終了する
  //if (operators.includes(value)&&...では演算子の連続入力を防ぐ
  const operators = ["+", "-", "*", "/"];
  if (operators.includes(value) && operators.includes(lastChar)) {
    return;
  }

  // 先頭に0がつくことを防ぐ（012などをしないようにする）
  if (value === "0" && display.value.length === 0) {
    return;
  }
  //00ボタンで、00が連続入力出来ないようにする
  if (value === "00" && (display.value === "" || lastChar === "0")) {
    return;
  }
  // 小数点の連続入力を防ぐ
  //最後に表示されているのが小数点の場合は新しく小数点を入力出来ないようにする
  if (value === "." && lastChar === ".") {
    return;
  }

  //11行目から29行目の各条件に当てはまらない場合に引数をdisplayへ入れる
  //displayに新しい値が追加される
  display.value += value;
}

//function calculateResult()で計算の結果を出す
//try...catchではエラーとなった際にdisplayにエラーと出る、例外による異常終了をさせない
function calculateResult() {
  const expression = display.value; //現在の計算式を取得する
  try {
    const result = evaluateExpression(expression);
    display.value = result;
  } catch (error) {
    //例外の発生時に下記が行われる
    display.value = "エラー";
  }
}

//evaluateExpressionでは文字列として計算式を受け取り結果を返す
function evaluateExpression(expression) {
  const operators = ["+", "-", "*", "/"]; //operators（配列）に演算子が入っている
  let num = "";
  const numbers = []; //数字を入れる配列
  const ops = []; //演算子を入れる配列

  //for文（ループ）
  //expression(計算式)の文字列を1文字ずつ取り出して処理
  //if(!operators...)は、charが演算子ではなく数字や小数点の場合の処理
  //num += char;では、numに数字や小数点を追加する

  for (let char of expression) {
    if (!operators.includes(char)) {
      num += char;
    } else {
      //elseはcharが演算子だった場合の処理
      //numに数字があればnumber配列に追加
      //parseFloat(num)は文字列になっている数字（"10"や"1.5"など）を実際の数値にする
      if (num) {
        numbers.push(parseFloat(num));
        num = "";
      }
      ops.push(char); //演算子をopsという配列に追加
    }
  }
  //if(num){...では、numに値が入っているかを確認し、numを数字として処理し、numbers(配列)に追加
  if (num) {
    //numは数字を文字列として、一時的に保持する変数
    numbers.push(parseFloat(num));
  }

  // 演算を実行
  //resultで0にする
  let result = numbers[0];
  for (let i = 0; i < ops.length; i++) {
    const op = ops[i];
    const nextNum = numbers[i + 1];

    if (op === "+") result += nextNum;
    else if (op === "-") result -= nextNum;
    else if (op === "*") result *= nextNum;
    else if (op === "/") result /= nextNum;
  }

  return result;
}

//ACを押すとdisplayの内容をクリアする
function clearDisplay() {
  display.value = "";
}
