const adminForm = document.querySelector('.admin-actions');
adminForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    const adminEmail = document.querySelector('#admin-email').value;
    const addAdminRole = functions.httpsCallable('addAdminRole');
    addAdminRole({email:adminEmail}).then(result =>{
    console.log(result);
    adminForm.reset();
    });
});
// auth tracker
auth.onAuthStateChanged(user =>{
    if(user){
        user.getIdTokenResult().then(idTokenResult =>{
            user.admin = idTokenResult.claims.admin;
            setupUi(user);
           // deletingGuides(docs);
        })
        db.collection('guides').onSnapshot(snapshot=>{
            setupGuide(snapshot.docs);

        }, err =>{
            alert(err.message);
        });
    }else{
        setupUi();
        setupGuide([]);
    }
});


const signupForm = document.querySelector('#signup-form');
signupForm.addEventListener('submit',(e)=>{
    e.preventDefault();

    // get user details
    const email = signupForm['signup-email'].value;
    const pass = signupForm['signup-password'].value;

    //console.log(email,pass)
    //get user
    auth.createUserWithEmailAndPassword(email,pass).then(cred =>{
       return db.collection('users').doc(cred.user.uid).set({
           bio:signupForm['from-bio'].value
       });
    }).then(()=>{
        const modal = document.querySelector('#modal-signup');
        M.Modal.getInstance(modal).close();
        signupForm.reset();
    }).catch(err =>{
        alert(err.message)
    })
});

//login modle
const login = document.querySelector('#login-form');
login.addEventListener('submit',(e)=>{
    e.preventDefault();

    // get user details
    const email = login['login-email'].value;
    const pass = login['login-password'].value;

    //console.log(email,pass)
    //get user
    auth.signInWithEmailAndPassword(email,pass).then(cred =>{
        //console.log(cred.user);
        const modaal = document.querySelector('#modal-login');
        M.Modal.getInstance(modaal).close();
        login.reset();
        console.log('user loged in')
    }).catch(err => {
        alert(err.message)
      });
});

//create form
const createFrom = document.querySelector('#create-form');
createFrom.addEventListener('submit',(e)=>{
    e.preventDefault();

    db.collection('guides').add({
        title:createFrom['title'].value,
        content:createFrom['content'].value,
        source:createFrom['source'].value

    }).then(()=>{
        const modal = document.querySelector('#modal-create');
        M.Modal.getInstance(modal).close();
        createFrom.reset();
    });
});

// sign out
const logout = document.querySelector('#logout');
logout.addEventListener('click',(e)=>{
        e.preventDefault();
        auth.signOut().then(()=>{
                console.log('User Sign Out')
        })
})




