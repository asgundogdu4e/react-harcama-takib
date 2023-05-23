import React, { useEffect } from 'react'
import { getGirislerAction, deleteGirisAction, changeIsShowDetailFormAction, setSelectedGirisAction } from '../../store/actions/girislerActions';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Modal, Popconfirm, Space, Table } from 'antd';
import { formatDate } from './../../assets/js/date';
import Giris from './Giris';
const GirislerList = () => {
    // const [selectedGiris, setSelectedGirisAction] = useState(undefined);
    const dispatch = useDispatch();
    const girislerList = useSelector(state => state.girisler.girislerList);
    const isShowDetailForm = useSelector(state => state.girisler.isShowDetailForm);

    useEffect(() => {
        dispatch(getGirislerAction());
    }, []);

    const showDetailForm = (record) => {
        dispatch(setSelectedGirisAction(record));
        dispatch(changeIsShowDetailFormAction(true));
    }
    const columns = [
        {
            title: '#',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Giriş Tarihi',
            dataIndex: 'tarih',
            key: 'tarih',
            render: (text) => <a>{formatDate(text)}</a>,
        },
        {
            title: 'Giriş Miktarı',
            dataIndex: 'miktar',
            key: 'miktar',
        },
        {
            title: 'İşlemler',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Button type="primary" onClick={() => showDetailForm(record)}>Düzelt</Button>
                    <Popconfirm
                        placement="topRight"
                        title="Sil"
                        description="Kayıt silinsin mi?"
                        onConfirm={() => { dispatch(deleteGirisAction(record.id)); }}
                        okText="Sil"
                        cancelText="İptal"
                    >
                        <Button danger>Sil</Button>
                    </Popconfirm>
                </Space>
            ),
        },
    ]

    return (
        <div>
            <h1>Girişler</h1>
            <Button onClick={() => showDetailForm(undefined)}>Yeni Giriş</Button>
            <Table columns={columns} dataSource={girislerList} rowKey="id" />

            <Modal title="Giriş Kaydı" open={isShowDetailForm} footer={false}>
                <Giris />
            </Modal>
        </div>
    )
}

export default GirislerList;