import{C as b,c as g,R as t,r as a}from"./CreateReactScript-fryF6WsV.js";import{T as v,R as o}from"./Table-DxOOZK6a.js";import{P as u,T as x}from"./TextareaFormGroup-C_B3CboX.js";import{A as T}from"./Adminto-Ckx4Zi2i.js";import{M as F}from"./Modal-BlYbLNMj.js";import{I as y}from"./InputFormGroup-h37C16bz.js";import{T as E}from"./TippyButton-CLwADKzg.js";import"./sweetalert2.all-uggxmCrK.js";const w=({can:n})=>{const l=a.useRef(),s=a.useRef(),i=a.useRef(),c=a.useRef(),m=a.useRef(),[p,d]=a.useState(!1),f=e=>{e!=null&&e.id?d(!0):d(!1),i.current.value=(e==null?void 0:e.id)||null,c.current.value=(e==null?void 0:e.name)||null,m.current.value=(e==null?void 0:e.description)||null,$(s.current).modal("show")},R=async e=>{e.preventDefault();const r={id:i.current.value||void 0,name:c.current.value,description:m.current.value};await u.save(r)&&($(l.current).dxDataGrid("instance").refresh(),$(s.current).modal("hide"))},h=async e=>{await u.delete(e)&&$(l.current).dxDataGrid("instance").refresh()};return t.createElement(t.Fragment,null,t.createElement(v,{gridRef:l,title:"Permisos",rest:u,toolBar:e=>{e.unshift({widget:"dxButton",location:"after",options:{icon:"refresh",hint:"Refrescar tabla",onClick:()=>$(l.current).dxDataGrid("instance").refresh()}}),n("permissions","root","all","create")&&e.unshift({widget:"dxButton",location:"after",options:{icon:"plus",hint:"Nuevo registro",onClick:()=>f()}})},columns:[{dataField:"id",caption:"ID",dataType:"number",sortOrder:"asc"},{dataField:"name",caption:"Permiso"},{dataField:"description",caption:"Descripcion"},{dataField:"created_at",caption:"Fecha creacion",dataType:"date",cellTemplate:(e,{data:r})=>{o(e,t.createElement("span",null,moment(r.created_at).format("LL")))}},{dataField:"updated_at",caption:"Fecha actualizacion",dataType:"date",cellTemplate:(e,{data:r})=>{o(e,t.createElement("span",null,moment(r.updated_at).format("LL")))}},n("permissions","root","all","update","delete")?{caption:"Acciones",cellTemplate:(e,{data:r})=>{e.attr("style","display: flex; gap: 4px; overflow: unset"),n("permissions","root","all","update")&&o(e,t.createElement(E,{className:"btn btn-xs btn-soft-primary",title:"Editar",onClick:()=>f(r)},t.createElement("i",{className:"fa fa-pen"}))),n("permissions","root","all","delete")&&o(e,t.createElement(E,{className:"btn btn-xs btn-soft-danger",title:"Eliminar",onClick:()=>h(r.id)},t.createElement("i",{className:"fa fa-trash-alt"})))},allowFiltering:!1,allowExporting:!1}:null]}),t.createElement(F,{modalRef:s,title:p?"Editar permiso":"Agregar permiso",onSubmit:R},t.createElement("div",{className:"row"},t.createElement("p",null,"Intenta con el formato ",t.createElement("code",null,"ventana.permiso"),". Ej: ",t.createElement("code",null,"clients.create"),", ",t.createElement("code",null,"clients.list"),", ",t.createElement("code",null,"clients.update"),", ",t.createElement("code",null,"clients.delete")),t.createElement("input",{ref:i,type:"hidden"}),t.createElement(y,{eRef:c,label:"Permiso",col:"col-12",required:!0,disabled:p}),t.createElement(x,{eRef:m,label:"Descripcion",col:"col-12"}))))};b((n,l)=>{if(!l.can("permissions","root","all","list"))return location.href="/";g(n).render(t.createElement(T,{...l,title:"Permisos"},t.createElement(w,{...l})))});
