
const guideList = document.querySelector('.guides');
const loutlinks = document.querySelectorAll('.logged-in');
const linlinks = document.querySelectorAll('.logged-out');
const accdetails = document.querySelector('.account-details');
const adminItem = document.querySelectorAll('.admin');
const del = document.querySelector('.guides');


const setupUi = (user) =>{
    if(user){
        if(user.admin){
            adminItem.forEach(item => item.style.display = 'block');
        }
        db.collection('users').doc(user.uid).get().then(doc =>{
            const html = `
                <div>Login as <span style="color:blue;"> ${user.email}</span></div>
                <div>${doc.data().bio}</div>
                <div>${user.admin  ? 'Admin' : '' }</div>
        `;
        accdetails.innerHTML = html;
        }); 
        
        loutlinks.forEach(item => item.style.display = 'block');
        linlinks.forEach(item => item.style.display = 'none');
    }else{
        adminItem.forEach(item => item.style.display = 'none');
        loutlinks.forEach(item => item.style.display = 'none');
        linlinks.forEach(item => item.style.display = 'block');
    }
}


const setupGuide = (data) =>{
    if(data.length){
        let html = '';
        data.forEach(element => {
            const guide = element.data();
            const li = `
                <li>
                <div class="collapsible-header grey lighten-4" id="id1"><h6 style="font-family:Comic Sans MS, Times, serif;">${guide.title}</h6></div>
                <i class="fa fa-home"></i>
                <div class="collapsible-body white" id="id1">${guide.content} <p><strong> Source :</strong> <a href="${guide.source}" target="_blank"> ${guide.source} </a></p>
                <button onclick="deletingGuides()">delete</button>
                </div>
                </li>
            `;
            html += li;

        });
        guideList.innerHTML = html;
    }else{
        guideList.innerHTML = '<h6>Please log in</h6>';
    } 
}

//Deleting guides
function deletingGuides(docs){

   db.collection("guides").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            console.log(doc.id);
            let id = doc.id;
            db.collection('guides').doc(id).delete();  
            //console.log(`${doc.id} => ${doc.data()}`);
        });
    });
    //


    // let id = db.collection('guides').doc('DC').delete();
    // return id.then(res => {
    //     console.log('Delete: ', res);
    //   });
    

}

// setup materialize components
document.addEventListener('DOMContentLoaded', function() {

    var modals = document.querySelectorAll('.modal');
    M.Modal.init(modals);
  
    var items = document.querySelectorAll('.collapsible');
    M.Collapsible.init(items);
  
  });