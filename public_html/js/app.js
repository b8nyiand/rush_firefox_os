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

document.querySelector('#btn-show-profile-stats').addEventListener('click', function () {
    document.querySelector('#show-profile-stats').className = 'current';
    document.querySelector('[data-position="current"]').className = 'left';
});

document.querySelector('#btn-back3').addEventListener('click', function () {
    document.querySelector('#show-profile-stats').className = 'right';
    document.querySelector('[data-position="current"]').className = 'current';
});

//navigating from dashboard to the settings view, and back

document.querySelector('#btn-settings').addEventListener('click', function () {
    document.querySelector('#settings').className = 'current';
    document.querySelector('[data-position="current"]').className = 'left';
});

document.querySelector('#btn-back4').addEventListener('click', function () {
    document.querySelector('#settings').className = 'right';
    document.querySelector('[data-position="current"]').className = 'current';
});

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