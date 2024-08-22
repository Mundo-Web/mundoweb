
import JSEncrypt from 'jsencrypt'
import React, { useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import CreateReactScript from './Utils/CreateReactScript.jsx'
import ReactAppend from './Utils/ReactAppend.jsx'
import SetSelectValue from './Utils/SetSelectValue.jsx'
import RolesRest from './actions/RolesRest.js'
import UsersRest from './actions/UsersRest.js'
import Adminto from './components/Adminto'
import Modal from './components/Modal.jsx'
import Table from './components/Table.jsx'
import InputFormGroup from './components/form/InputFormGroup.jsx'
import PasswordFormGroup from './components/form/PasswordFormGroup.jsx'
import SelectAPIFormGroup from './components/form/SelectAPIFormGroup.jsx'
import TippyButton from './components/form/TippyButton.jsx'
import DxBox from './components/dx/DxBox.jsx'
import DxButton from './components/dx/DxButton.jsx'

const Users = ({ can, PUBLIC_RSA_KEY }) => {
  const gridRef = useRef()
  const modalRef = useRef()

  // Form elements ref
  const idRef = useRef()
  const nameRef = useRef()
  const lastnameRef = useRef()
  const emailRef = useRef()
  const rolesRef = useRef()
  const passwordRef = useRef()
  const confirmRef = useRef()

  const jsEncrypt = new JSEncrypt()
  jsEncrypt.setPublicKey(PUBLIC_RSA_KEY)

  const [isEditing, setIsEditing] = useState(false)

  const onModalOpen = async (data) => {



    if (data?.id) setIsEditing(true)
    else setIsEditing(false)

    const roles = await RolesRest.byUser(data?.id)

    idRef.current.value = data?.id || null
    nameRef.current.value = data?.name || null
    lastnameRef.current.value = data?.lastname || null
    emailRef.current.value = data?.email || null
    SetSelectValue(rolesRef.current, roles, 'id', 'name')
    passwordRef.current.value = null
    confirmRef.current.value = null

    $(modalRef.current).modal('show')
  }

  const onModalSubmit = async (e) => {
    e.preventDefault()

    const password = passwordRef.current.value
    const confirm = confirmRef.current.value

    const request = {
      id: idRef.current.value || undefined,
      name: nameRef.current.value,
      lastname: lastnameRef.current.value,
      email: emailRef.current.value,
      roles: $(rolesRef.current).val(),
      password: password ? jsEncrypt.encrypt(password) : undefined,
      confirm: confirm ? jsEncrypt.encrypt(confirm) : undefined
    }

    const result = await UsersRest.save(request)
    if (!result) return

    $(gridRef.current).dxDataGrid('instance').refresh()
    $(modalRef.current).modal('hide')
  }

  const onStatusChange = async ({ id, status }) => {
    const result = await UsersRest.status({ id, status })
    if (!result) return
    $(gridRef.current).dxDataGrid('instance').refresh()
  }

  const onDeleteClicked = async (id) => {
    const result = await UsersRest.delete(id)
    if (!result) return
    $(gridRef.current).dxDataGrid('instance').refresh()
  }

  return (<>
    <Table gridRef={gridRef} title='Usuarios' rest={UsersRest}
      toolBar={(container) => {
        container.unshift({
          widget: 'dxButton', location: 'after',
          options: {
            icon: 'refresh',
            hint: 'Refrescar tabla',
            onClick: () => $(gridRef.current).dxDataGrid('instance').refresh()
          }
        });
        container.unshift({
          widget: 'dxButton', location: 'after',
          options: {
            icon: 'plus',
            hint: 'Nuevo registro',
            onClick: () => onModalOpen()
          }
        });
      }}
      columns={[
        {
          dataField: 'id',
          caption: 'ID',
          dataType: 'number',
          sortOrder: 'asc'
        },
        {
          dataField: 'name',
          caption: 'Nombres'
        },
        {
          dataField: 'lastname',
          caption: 'Apellidos'
        },
        {
          dataField: 'email',
          caption: 'Correo',
          dataType: 'email',
          cellTemplate: (container, { data }) => {
            container.append(DxBox([
              <img
                className='avatar-xs rounded-circle'
                src={`/api/profile/thumbnail/${data.relative_id}`}
                alt={data.name}
              />,
              <p className='mb-0' style={{ fontSize: "14px" }}>{data.email}</p>
            ], false))
          }
        },
        {
          dataField: 'status',
          caption: 'Estado',
          dataType: 'boolean',
          cellTemplate: (container, { data }) => {
            switch (data.status) {
              case 1:
                ReactAppend(container, <span className='badge bg-success rounded-pill'>Activo</span>)
                break
              case 0:
                ReactAppend(container, <span className='badge bg-danger rounded-pill'>Inactivo</span>)
                break
              default:
                ReactAppend(container, <span className='badge bg-dark rounded-pill'>Eliminado</span>)
                break
            }
          }
        },
        {
          caption: 'Acciones',
          cellTemplate: (container, { data }) => {
            can('users', 'root', 'all', 'update') && container.append(DxButton({
              className: 'btn btn-xs btn-soft-primary',
              title: 'Editar',
              icon: 'fa fa-pen',
              onClick: () => onModalOpen(data)
            }))
            can('projects', 'root', 'all', 'assignUsers') && container.append(DxButton({
              className: 'btn btn-xs btn-soft-info',
              title: 'Asignar proyectos',
              icon: 'fas fa-folder-plus',
              onClick: () => onAssignProjects()
            }))
            can('users', 'root', 'all', 'update') && container.append(DxButton({
              className: 'btn btn-xs btn-light',
              title: data.status === null ? 'Restaurar' : 'Cambiar estado',
              icon: data.status === 1 ? 'fa fa-toggle-on text-success' : data.status === 0 ? 'fa fa-toggle-off text-danger' : 'fas fa-trash-restore',
              onClick: () => onStatusChange(data)
            }))
            can('users', 'root', 'all', 'delete') && container.append(DxButton({
              className: 'btn btn-xs btn-soft-danger',
              title: 'Eliminar',
              icon: 'fa fa-trash-alt',
              onClick: () => onDeleteClicked(data.id)
            }))
          },
          allowFiltering: false,
          allowExporting: false
        }
      ]} />
    <Modal modalRef={modalRef} title={isEditing ? 'Editar usuario' : 'Agregar usuario'} onSubmit={onModalSubmit}>
      <div className='row' id='users-crud-container'>
        <input ref={idRef} type='hidden' />
        <InputFormGroup eRef={nameRef} label='Nombres' col='col-md-6' required />
        <InputFormGroup eRef={lastnameRef} label='Apellidos' col='col-md-6' required />
        <InputFormGroup eRef={emailRef} label='Correo' col='col-12' type='email' required />
        <SelectAPIFormGroup eRef={rolesRef} label='Asignar roles' col='col-12' dropdownParent='#users-crud-container' searchAPI='/api/roles/paginate' searchBy='name' required multiple />
        <PasswordFormGroup eRef={passwordRef} label='Contraseña' col='col-md-6' required={!isEditing} />
        <PasswordFormGroup eRef={confirmRef} label='Repetir contraseña' col='col-md-6' required={!isEditing} />
      </div>
    </Modal>
  </>
  )
};

CreateReactScript((el, properties) => {
  createRoot(el).render(
    <Adminto {...properties} title='Usuarios'>
      <Users {...properties} />
    </Adminto>
  );
})