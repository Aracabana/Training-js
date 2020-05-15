function myNotification(title, options) {
    // function to actually ask the permissions
    function handlePermission(permission) {
        // Whatever the user answers, we make sure Chrome stores the information
        if (!('permission' in Notification)) {
            Notification.permission = permission;
        }
        
        // show notification
        if (Notification.permission === 'granted') {
            console.log(Notification.permission);
            new Notification(title, options);
        }
    }
    
    // Let's check if the browser supports notifications
    if (!('Notification' in window)) {
        console.log("This browser does not support notifications.");
    } else {
        if (checkNotificationPromise()) {
            Notification.requestPermission()
                .then((permission) => {
                    handlePermission(permission);
                })
        } else {
            Notification.requestPermission(function(permission) {
                handlePermission(permission);
            });
        }
    }
}

function checkNotificationPromise() {
    try {
        Notification.requestPermission().then();
    } catch(e) {
        return false;
    }
    return true;
}

myNotification('Hello!',{
    body: 'Testing notifications',
    icon: 'ico-user-in-circle.svg',
    dir: 'auto'
});
