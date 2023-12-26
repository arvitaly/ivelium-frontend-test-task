import { Button, Checkbox, Form, Input, notification } from "antd";
import { gql } from "../../__generated__";
import { createApolloClient } from "../../util/apollo";
import { useContext, useState } from "react";
import { TOKEN_STORAGE_NAME } from "../../constants";
import TokenContext from "../../contexts/TokenContext";
import { useLocation, useNavigate } from "react-router-dom";
import { formatLink } from "../../util/router";

const VIEWER_QUERY = gql(`
  query VIEWER_QUERY {
    viewer {
      login
    }
  }
`);

type FieldType = {
  token: string;
  remember: boolean;
};

const LoginPage = () => {
  const { search } = useLocation();
  const { setToken, token } = useContext(TokenContext);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = (values: FieldType) => {
    setLoading(true);
    const client = createApolloClient(values.token);
    client
      .query({
        query: VIEWER_QUERY,
      })
      .then((result) => {
        notification.success({
          message: "Loginned as " + result.data.viewer.login,
          duration: 5000,
        });
        if (values.remember) {
          localStorage.setItem(TOKEN_STORAGE_NAME, values.token);
        }
        setToken(values.token);
        const urlParams = new URLSearchParams(search);
        const backTo = urlParams.get("redirect") || "/";
        console.log(`Redirect to ${backTo}`);
        navigate(formatLink(backTo));
      })
      .catch((error) => {
        const message = error.message || "Unknown error";
        notification.error({ message });
      })
      .finally(() => setLoading(false));
  };

  const onFinishFailed = (errorInfo: unknown) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
      }}
    >
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true, token }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item<FieldType>
          label="Github Token"
          name="token"
          rules={[{ required: true, message: "Please input token!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item<FieldType>
          name="remember"
          valuePropName="checked"
          wrapperCol={{ offset: 8, span: 16 }}
        >
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button loading={loading} type="primary" htmlType="submit">
            Check &amp; Save
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginPage;
