const balance=document.getElementById('balance');
const money_plus=document.getElementById('money-plus');
const money_minus=document.getElementById('money-minus');
const list=document.getElementById('list');

const text=document.getElementById('text');
const form=document.getElementById('form');


let transactions=[];

function addTransactions(e){
    e.preventDefault();
    if(text.value.trim()=="" || amount.value.trim()== ""){
        alert("Empty data not allowed");
    }else{
    const transaction={
        id: Math.random()*10000, text:text.value,amount:parseInt(amount.value)
    };

    transactions.push(transaction);
    addTransactionsDOM(transaction);
    updateValues();
    text.value=""
    amount.value=""

}
}





function addTransactionsDOM(transactions){
    const sign=transactions.amount<0? "-":"+";
    const item=document.createElement('li');

    item.classList.add( transactions.amount<0? "minus":"plus");

    item.innerHTML=`${transactions.text} <span>${sign}$${Math.abs(transactions.amount)}</span><button class="delete-btn" onclick="removeTransaction(${transactions.id})">x</button>`;

    list.appendChild(item);

}

function removeTransaction(id){

    transactions=transactions.filter(transaction=> transaction.id !== id);
    init();

    
}

function updateValues(){
    const amounts=transactions.map(transaction=> transaction.amount);
    const total=amounts.reduce((acc,ele)=>{
        return acc=acc+ele
    },0).toFixed(2);
    const income=amounts.filter(item=>item>0).reduce((acc,item)=>acc=acc+item,0).toFixed(2);
    const expense=(amounts.filter(item=>item<0).reduce((acc,item)=>acc=acc+Math.abs(item),0)*-1).toFixed(2);

    balance.innerText=`$${total}`;
    money_plus.innerText=`$${income}`;
    money_minus.innerText=`$${expense}`;


}

function init(){
    list.innerHTML="";
    transactions.forEach(addTransactionsDOM);
    updateValues();
}
init();
form.addEventListener('submit',addTransactions);

