import { Button, DatePicker, Form, InputNumber } from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import { changeIsShowDetailFormAction, postGirisAction, updateGirisAction } from './../../store/actions/girislerActions';

export default function Giris() {
    const selectedGiris = useSelector(state => state.girisler.selectedGiris);
    const isShowDetailForm = useSelector(state => state.girisler.isShowDetailForm);
    const dispatch = useDispatch();
    const [form] = Form.useForm();

    useEffect(() => {
        form.resetFields();
    }, [isShowDetailForm]);

    useEffect(() => {
        if (selectedGiris) {
            const values = { ...selectedGiris, tarih: dayjs(new Date(selectedGiris.tarih)) }
            form.setFieldsValue(values);
        }
    }, [selectedGiris]);

    return (
        <div>
            <Form
                form={form}
                onFinish={(values) => {
                    if (selectedGiris) {
                        values.id = selectedGiris.id
                        dispatch(updateGirisAction(values))
                    } else {
                        dispatch(postGirisAction(values))
                    }
                }}

            >
                <Form.Item
                    label="Tarih"
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
                    name="miktar"
                    label="Miktar"
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
