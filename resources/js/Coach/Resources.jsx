import React, { useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import Adminto from '../Components/Adminto';
import CreateReactScript from '../Utils/CreateReactScript';
import ResourcesRest from '../Actions/ResourcesRest';
import Table from '../Components/Table';
import Modal from '../Components/Modal';
import InputFormGroup from '../Components/form/InputFormGroup';
import TextareaFormGroup from '../Components/form/TextareaFormGroup';
import ReactAppend from '../Utils/ReactAppend';
import TippyButton from '../Components/form/TippyButton';
import SelectFormGroup from '../Components/form/SelectFormGroup';
import QuillFormGroup from '../Components/form/QuillFormGroup';
import DxButton from '../Components/dx/DxButton';

const resourcesRest = new ResourcesRest()

const Resources = ({ specialties }) => {

  const gridRef = useRef()
  const modalRef = useRef()

  // Form elements ref
  const idRef = useRef()
  const nameRef = useRef()
  const tagsRef = useRef()
  const specialtyRef = useRef()
  const socialMediaRef = useRef()
  const mediaIdRef = useRef()
  const descriptionRef = useRef()

  const [isEditing, setIsEditing] = useState(false)

  const onModalOpen = (data) => {
    if (data?.id) setIsEditing(true)
    else setIsEditing(false)

    idRef.current.value = data?.id ?? ''
    nameRef.current.value = data?.name ?? ''
    tagsRef.current.value = data?.tags ?? ''
    $(specialtyRef).val(data?.specialty_id ?? '').trigger('change')
    $(socialMediaRef).val(data?.social_media ?? '').trigger('change')
    mediaIdRef.current.value = data?.media_id ?? ''
    descriptionRef.editor.root.innerHTML = data?.description

    $(modalRef.current).modal('show')
  }

  const onModalSubmit = async (e) => {
    e.preventDefault()

    const request = {
      id: idRef.current.value || undefined,
      name: nameRef.current.value,
      tags: tagsRef.current.value,
      specialty_id: specialtyRef.current.value,
      social_media: socialMediaRef.current.value,
      media_id: mediaIdRef.current.value,
      description: descriptionRef.current.value,
    }

    const result = await resourcesRest.save(request)
    if (!result) return

    $(gridRef.current).dxDataGrid('instance').refresh()
    $(modalRef.current).modal('hide')
  }

  const onStatusChange = async ({ id, status }) => {
    const result = await statusesRest.status({ id, status })
    if (!result) return
    $(gridRef.current).dxDataGrid('instance').refresh()
  }

  const onDeleteClicked = async (id) => {
    const result = await statusesRest.delete(id)
    if (!result) return
    $(gridRef.current).dxDataGrid('instance').refresh()
  }

  return (<>
    <Table gridRef={gridRef} title='Recursos' rest={resourcesRest}
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
            text: 'Nuevo recurso',
            hint: 'Nuevo recurso',
            onClick: () => onModalOpen()
          }
        });
      }}
      columns={[
        {
          dataField: 'id',
          caption: 'ID',
          visible: false
        },
        {
          dataField: 'specialty.name',
          caption: 'Especialidad',
        },
        {
          dataField: 'name',
          caption: 'Titulo'
        },
        {
          dataField: 'id',
          caption: 'Imagen',
          width: '90px',
          cellTemplate: (container, { data }) => {
            ReactAppend(container, <img src='/api/cover/thumbnail/null' style={{ width: '80px', height: '48px', objectFit: 'cover', objectPosition: 'center', borderRadius: '4px' }} />)
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
            container.append(DxButton({
              className: 'btn btn-xs btn-soft-primary',
              title: 'Editar',
              icon: 'fa fa-pen',
              onClick: () => onModalOpen(data)
            }))
            container.append(DxButton({
              className: 'btn btn-xs btn-soft-danger',
              title: 'Eliminar',
              icon: 'fa fa-trash',
              onClick: () => onDeleteClicked(data.id)
            }))
          },
          allowFiltering: false,
          allowExporting: false
        }
      ]} />
    <Modal modalRef={modalRef} title={isEditing ? 'Editar recurso' : 'Agregar recurso'} onSubmit={onModalSubmit} size='md'>
      <div className='row' id='resources-container'>
        <input ref={idRef} type='hidden' />
        <InputFormGroup eRef={nameRef} label='Titulo' col='col-12' required />
        <InputFormGroup eRef={tagsRef} label='Tags (Separado por comas)' col='col-12' required />
        <SelectFormGroup eRef={specialtyRef} label="Especialidad" dropdownParent='#resources-container' required>
          {
            specialties.map((specialty, i) => {
              return <option key={`specialty-${i}`} value={specialty.id}>{specialty.name}</option>
            })
          }
        </SelectFormGroup>
        <SelectFormGroup eRef={socialMediaRef} label="Red social" dropdownParent='#resources-container' required>
          <option value="youtube">YouTube</option>
          <option value="facebook">Facebook</option>
        </SelectFormGroup>
        <InputFormGroup eRef={mediaIdRef} label='Link del recurso' col='col-12' required />
        <QuillFormGroup eRef={descriptionRef} label='Descripcion' col='col-12' height='240px' required />
      </div>
    </Modal>
  </>
  )
}

CreateReactScript((el, properties) => {

  createRoot(el).render(<Adminto {...properties} title='Recursos'>
    <Resources {...properties} />
  </Adminto>);
})