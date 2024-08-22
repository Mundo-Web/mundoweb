var g=Object.defineProperty;var N=(s,t,a)=>t in s?g(s,t,{enumerable:!0,configurable:!0,writable:!0,value:a}):s[t]=a;var u=(s,t,a)=>(N(s,typeof t!="symbol"?t+"":t,a),a);import{m as o,C as h,c as R,R as e,r as l}from"./CreateReactScript-fryF6WsV.js";import{A as C,L as y}from"./Adminto-Ckx4Zi2i.js";import{I as P}from"./InputFormGroup-h37C16bz.js";import{P as n}from"./PasswordFormGroup-B_vqCPa3.js";import{J as A}from"./JSEncrypt-D3I3x59l.js";import"./sweetalert2.all-uggxmCrK.js";class c{}u(c,"email",async t=>{try{const{status:a,result:r}=await o.Fetch("/api/account/email",{method:"PATCH",body:JSON.stringify(t)});if(!a)throw new Error((r==null?void 0:r.message)||"Ocurrio un error inesperado");return o.Notify.add({icon:"/assets/img/logo-login.svg",title:"Correcto",body:r.message,type:"success"}),!0}catch(a){return o.Notify.add({icon:"/assets/img/logo-login.svg",title:"Error",body:a.message,type:"danger"}),!1}}),u(c,"password",async t=>{try{const{status:a,result:r}=await o.Fetch("/api/account/password",{method:"PATCH",body:JSON.stringify(t)});if(!a)throw new Error((r==null?void 0:r.message)||"Ocurrio un error inesperado");return o.Notify.add({icon:"/assets/img/logo-login.svg",title:"Correcto",body:r.message,type:"success"}),!0}catch(a){return o.Notify.add({icon:"/assets/img/logo-login.svg",title:"Error",body:a.message,type:"danger"}),!1}});const S=({session:s,PUBLIC_RSA_KEY:t})=>{const a=new A;a.setPublicKey(t);const r=l.useRef(),d=l.useRef(),p=l.useRef(),b=l.useRef(),f=l.useRef(),v=async i=>{i.preventDefault();const m={email:r.current.value,password:a.encrypt(d.current.value)};await c.email(m)&&y()},E=async i=>{i.preventDefault();const m={password:a.encrypt(p.current.value),newPassword:a.encrypt(b.current.value),confirmPassword:a.encrypt(f.current.value)};await c.password(m)&&y()};return e.createElement("div",{className:"row justify-content-center align-items-center",style:{height:"calc(100vh - 135px)"}},e.createElement("div",{className:"col-lg-6 col-md-8 col-sm-12"},e.createElement("div",{className:"card"},e.createElement("div",{className:"card-header"},e.createElement("h4",{className:"card-title mb-0"},"Cuenta de usuario")),e.createElement("div",{className:"card-body"},e.createElement("div",{className:"row"},e.createElement("div",{className:"col-sm-4"},e.createElement("div",{className:"nav flex-column nav-pills nav-pills-tab",id:"v-pills-tab",role:"tablist","aria-orientation":"vertical"},e.createElement("a",{className:"nav-link active show mb-1",id:"email-container-tab","data-bs-toggle":"pill",href:"#email-container",role:"tab","aria-controls":"email-container","aria-selected":"true"},"Correo"),e.createElement("a",{className:"nav-link mb-1",id:"password-container-tab","data-bs-toggle":"pill",href:"#password-container",role:"tab","aria-controls":"password-container","aria-selected":"false"},"Contraseña"))),e.createElement("div",{className:"col-sm-8"},e.createElement("div",{className:"tab-content pt-0"},e.createElement("form",{className:"tab-pane fade active show",id:"email-container",role:"tabpanel","aria-labelledby":"email-container-tab",onSubmit:v},e.createElement("h4",{className:"mt-0"},"Actualizar correo de usuario"),e.createElement(P,{eRef:r,label:"Correo de usuario",type:"email",value:s.email,required:!0}),e.createElement(n,{eRef:d,label:"Contraseña de confirmacion",type:"password",value:null,required:!0}),e.createElement("button",{className:"btn btn-primary btn-block",type:"submit"},e.createElement("i",{className:"fa fa-save"})," Actualizar")),e.createElement("form",{className:"tab-pane fade",id:"password-container",role:"tabpanel","aria-labelledby":"password-container-tab",onSubmit:E},e.createElement("h4",{className:"mt-0"},"Actualizar contraseña de usuario"),e.createElement(n,{eRef:p,label:"Contraseña anterior",type:"password",value:null,required:!0}),e.createElement(n,{eRef:b,label:"Contraseña nueva",type:"password",value:null,required:!0}),e.createElement(n,{eRef:f,label:"Repita la contraseña nueva",type:"password",value:null,required:!0}),e.createElement("button",{className:"btn btn-primary btn-block",type:"submit"},e.createElement("i",{className:"fa fa-save"})," Actualizar"))))),e.createElement("hr",{className:"mt-3 mb-2"}),e.createElement("p",{className:"card-text text-center"},e.createElement("small",{className:"text-muted"},"Ultima actualizacion ",moment(s.updated_at).fromNow()))))))};h((s,t)=>{R(s).render(e.createElement(C,{...t,title:"Cuenta de usuario"},e.createElement(S,{...t})))});
