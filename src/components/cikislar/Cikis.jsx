import { Button, DatePicker, Form, InputNumber, Select } from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import { changeIsShowDetailFormAction, postCikisAction, updateCikisAction } from './../../store/actions/cikislarActions';

export default function Cikis() {
    const selectedCikis = useSelector(state => state.cikislar.selectedCikis);
    const isShowDetailForm = useSelector(state => state.cikislar.isShowDetailForm);
    const dispatch = useDispatch();
    const [form] = Form.useForm();
    const harcamaTurleriList = useSelector(state => state.harcamaTurleri.harcamaTurleriList);

    const harcamaTurleri = harcamaTurleriList.map((ht) => { return { value: ht.id, label: ht.tur } })

    useEffect(() => {
        form.resetFields();
    }, [isShowDetailForm]);

    useEffect(() => {
        if (selectedCikis) {
            const values = { ...selectedCikis, tarih: dayjs(new Date(selectedCikis.tarih)) }
            form.setFieldsValue(values);
        }
    }, [selectedCikis]);

    return (
        <div>
            <Form
                form={form}
                onFinish={(values) => {
                    if (selectedCikis) {
                        values.id = selectedCikis.id
                        dispatch(updateCikisAction(values))
                    } else {
                        dispatch(postCikisAction(values))
                    }
                }}

            >
                <Form.Item
                    label="Harcama Tarih"
                    name="tarih"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <DatePicker format={'DD.MM.YYYY'} />
                </Form.Item>
                <Form.Item
                    name="tur"
                    label="Harcama Türü"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Select
                        style={{
                            width: 120,
                        }}
                        options={harcamaTurleri}
                    />
                </Form.Item>
                <Form.Item
                    name="miktar"
                    label="Harcama Miktarı"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <InputNumber />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" style={{ marginRight: '10px' }}>
                        Kaydet
                    </Button>
                    <Button onClick={() => dispatch(changeIsShowDetailFormAction(false))}>
                        Kapat
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}
