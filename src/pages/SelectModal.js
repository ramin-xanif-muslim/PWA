import { Modal } from 'antd'
import Search from 'antd/lib/transfer/search'
import React, { useState } from 'react'

function SelectModal() {
    const [modalVisible, setModalVisible] = useState()
    const handleSearch = () => {}
    const onClose = () => {}
  return (
      <Modal
      title="Title"
      destroyOnClose={true}
      visible={modalVisible}
      onCancel={onClose}
      closable
      >
          <Search placeholder='Axtar' onChange={handleSearch}/>
      </Modal>
  )
}

export default SelectModal