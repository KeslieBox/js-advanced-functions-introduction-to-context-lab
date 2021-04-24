// Your code here
function createEmployeeRecord(array) {
    return {
        firstName: array[0],
        familyName: array[1],
        title: array[2], 
        payPerHour: array[3], 
        timeInEvents: [], 
        timeOutEvents: []
    }
}

function createEmployeeRecords(array) {
   return array.map(e => createEmployeeRecord(e))
}

function createTimeInEvent(empRecObj, dateString) {     
    
    let [date, hour] = dateString.split(' ')
    
    empRecObj.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date,
    }) 
    return empRecObj
}

function createTimeOutEvent(empRecObj, dateString) {     
    
    let [date, hour] = dateString.split(' ')
    
    empRecObj.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date,
    }) 
    return empRecObj
}

function hoursWorkedOnDate(empRecObj, dateString) {
    const timeIn = empRecObj.timeInEvents.find(e => e.date === dateString)
    const timeOut = empRecObj.timeOutEvents.find(e => e.date === dateString)
    const hoursWorked = (timeOut.hour - timeIn.hour)/ 100
     return hoursWorked
}

function wagesEarnedOnDate(empRecObj, dateString) {
    const wage = empRecObj.payPerHour
    return hoursWorkedOnDate(empRecObj, dateString) * wage
}

function allWagesFor(empRecObj) {
    const dates = empRecObj.timeInEvents.map(e => e.date)
 
    const allWages = dates.reduce(function(accumulator, date){
       return accumulator + wagesEarnedOnDate(empRecObj, date)
    }, 0)
    return allWages
}

function findEmployeeByFirstName(empArray, name) {
    return empArray.find(function(e){
        return e.firstName === name
    })
}

function calculatePayroll(empArray) {
    console.log("empArray=", empArray)
    return empArray.reduce( function(accumulator, record) {
        return accumulator + allWagesFor(record)
    }, 0)
}