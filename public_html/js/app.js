/*
 * Navigating between views
 */

/* global task_name */

//navigating from dashboard to the list of upcoming tasks, and back

document.querySelector('#btn-show-tasks').addEventListener('click', function () {
    document.querySelector('#show-tasks').className = 'current';
    document.querySelector('[data-position="current"]').className = 'left';
});

document.querySelector('#btn-back').addEventListener('click', function () {
    document.querySelector('#show-tasks').className = 'right';
    document.querySelector('[data-position="current"]').className = 'current';
});

//navigating from dashboard to the add task view, and back

document.querySelector('#btn-add-task').addEventListener('click', function () {
    document.querySelector('#add-task').className = 'current';
    document.querySelector('[data-position="current"]').className = 'left';
});

document.querySelector('#btn-back1').addEventListener('click', function () {
    document.querySelector('#add-task').className = 'right';
    document.querySelector('[data-position="current"]').className = 'current';
});

//navigating from dashboard to the achievements view, and back

document.querySelector('#btn-show-achievements').addEventListener('click', function () {
    document.querySelector('#show-achievements').className = 'current';
    document.querySelector('[data-position="current"]').className = 'left';
});

document.querySelector('#btn-back2').addEventListener('click', function () {
    document.querySelector('#show-achievements').className = 'right';
    document.querySelector('[data-position="current"]').className = 'current';
});

//navigating from dashboard to the profile and statistics view, and back

/*document.querySelector('#btn-show-profile-stats').addEventListener('click', function () {
    document.querySelector('#show-profile-stats').className = 'current';
    document.querySelector('[data-position="current"]').className = 'left';
});

document.querySelector('#btn-back3').addEventListener('click', function () {
    document.querySelector('#show-profile-stats').className = 'right';
    document.querySelector('[data-position="current"]').className = 'current';
});*/

//navigating from dashboard to the settings view, and back

/*document.querySelector('#btn-settings').addEventListener('click', function () {
 document.querySelector('#settings').className = 'current';
 document.querySelector('[data-position="current"]').className = 'left';
 });
 
 document.querySelector('#btn-back4').addEventListener('click', function () {
 document.querySelector('#settings').className = 'right';
 document.querySelector('[data-position="current"]').className = 'current';
 });*/

//navigating from dashboard to the exit app view

document.querySelector('#btn-exit-app').addEventListener('click', function () {
    document.querySelector('#exit-app').className = 'current';
    document.querySelector('[data-position="current"]').className = 'left';
});

document.querySelector('#btn-exit-no').addEventListener('click', function () {
    document.querySelector('#exit-app').className = 'right';
    document.querySelector('[data-position="current"]').className = 'current';
});

document.querySelector('#btn-exit-yes').addEventListener('click', function () {
    window.close();
});


/*
 * Database activities
 */

//initialising database tables, establising database connection
var taskForm = document.getElementById('add-task-form');
var taskName = document.getElementById('task-name');
var taskDesc = document.getElementById('task-description');
var taskType = document.getElementById('task-type');
var isUrgent = document.getElementById('urgent-box');
var deadline = document.getElementById('deadline');
var db;
var newItem = [
    {task_name: "", task_description: "", task_type: "", task_created: "2015", task_deadline: "", task_priority: "", task_isresolved: "upcoming", task_isnotified: ""}
];
var taskList = document.getElementById('show');

window.onload = function () {
    window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
    window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;
    window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;

    var DBOpenRequest = window.indexedDB.open("rush", 2);

    DBOpenRequest.onerror = function (event) {
        console.log("ERROR loading database.");
    };

    DBOpenRequest.onsuccess = function (event) {
        console.log("Database initialised.");

        db = DBOpenRequest.result;
        queryData();
    };

    DBOpenRequest.onupgradeneeded = function (event) {
        var db = event.target.result;

        db.onerror = function (event) {
            console.log('Error loading database.');
        };

        var taskObjectStore = db.createObjectStore("task", {keyPath: "task_name"});

        console.log("SUCCESS: Tables created.");

        taskObjectStore.createIndex("task_description", "task_description", {unique: false});
        taskObjectStore.createIndex("task_type", "task_type", {unique: false});
        taskObjectStore.createIndex("task_created", "task_created", {unique: false});
        taskObjectStore.createIndex("task_deadline", "task_deadline", {unique: false});
        taskObjectStore.createIndex("task_priority", "task_priority", {unique: false});
        taskObjectStore.createIndex("task_isresolved", "task_isresolved", {unique: false});
        taskObjectStore.createIndex("task_isnotified", "task_isnotified", {unique: false});

        console.log("SUCCESS: Table \"task\" fields created.");
    };

    function addTask(e) {
        e.preventDefault();

        var newItem = [
            {task_name: taskName.value, task_description: taskDesc.value, task_type: taskType.value, task_created: "2015", task_deadline: deadline.value, task_priority: isUrgent.value, task_isresolved: "upcoming", task_isnotified: ""}
        ];

        var transaction = db.transaction(["task"], "readwrite");

        transaction.oncomplete = function (event) {
            console.log("Adding task transaction completed.");
        };
        transaction.onerror = function (event) {
            console.log("Adding transaction failed!");
        };
        var objStore = transaction.objectStore("task");
        var objectStoreRequest = objStore.add(newItem[0]);

        objectStoreRequest.onsuccess = function (event) {
            console.log("Added one task successfully.");

            taskName.value = null;
            taskDesc.value = null;
            taskType.value = null;
            deadline.value = null;
            isUrgent.value = null;

        };
        queryData();
    }

    taskForm.addEventListener('submit', addTask, false);


    function queryData() {
        taskList.innerHTML = "";
        var objectStore = db.transaction('task').objectStore('task');
        objectStore.openCursor().onsuccess = function (event) {
            var cursor = event.target.result;
            if (cursor) {
                var listItem = document.createElement('li');
                taskList.appendChild(listItem);
                var paragr = document.createElement('p');
                var paragr2 = document.createElement('p');
                paragr.innerHTML = cursor.value.task_name;
                paragr2.innerHTML = cursor.value.task_description;
                listItem.appendChild(paragr);
                listItem.appendChild(paragr2);
                taskList.appendChild(listItem);
                paragr.setAttribute('data-task', cursor.value.task_name);

                listItem.onclick = function (event) {
                    deleteTask(event);
                    //console.log("ONE DAAAAAAAAAAAAAY... MR FOXXXXXXXX!!!");
                };

                cursor.continue();

            } else {
                console.log("All entries displayed.");
            }
        };
    }

    function deleteTask(event) {
        var dataTask = event.target.getAttribute('data-task');
        event.target.parentNode.parentNode.removeChild(event.target.parentNode);
        var deleteTaskRequest = db.transaction(["task"], "readwrite").objectStore("task").delete(dataTask);

        deleteTaskRequest.onsuccess = function (event) {
            console.log('Task \"' + dataTask + '\" deleted.');
        };
        
    }

}






