import { Button, Form, Input } from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import { changeIsShowDetailFormAction, postHarcamaTuruAction, updateHarcamaTuruAction } from './../../store/actions/harcamaTurleriActions';

export default function HarcamaTuru() {
    const selectedHarcamaTuru = useSelector(state => state.harcamaTurleri.selectedHarcamaTuru);
    const isShowDetailForm = useSelector(state => state.harcamaTurleri.isShowDetailForm);
    const dispatch = useDispatch();
    const [form] = Form.useForm();

    useEffect(() => {
        form.resetFields();
    }, [isShowDetailForm]);

    useEffect(() => {
        if (selectedHarcamaTuru) {
            form.setFieldsValue(selectedHarcamaTuru);
        }
    }, [selectedHarcamaTuru]);

    return (
        <div>
            <Form
                form={form}
                onFinish={(values) => {
                    if (selectedHarcamaTuru) {
                        values.id = selectedHarcamaTuru.id
                        dispatch(updateHarcamaTuruAction(values))
                    } else {
                        dispatch(postHarcamaTuruAction(values))
                    }
                }}

            >
                <Form.Item
                    name="tur"
                    label="Tür İsmi"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input />
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
