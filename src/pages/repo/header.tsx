import { Avatar, Space, Typography } from "antd";
import moment from "moment";
type RepoHeaderProps = {
  avatar: string;
  login: string;
  commitMessage: string;
  commitHash: string;
  commitDate: string;
};

const RepoHeader = ({
  avatar,
  login,
  commitMessage,
  commitHash,
  commitDate,
}: RepoHeaderProps) => {
  return (
    <Space style={{ justifyContent: "space-between", width: "100%" }}>
      <Space>
        <Avatar src={avatar} />
        <Typography.Text>{login}</Typography.Text>
        <Typography.Text type="secondary">{commitMessage}</Typography.Text>
      </Space>
      <Space>
        <Typography.Text code>{commitHash.substring(0, 8)}</Typography.Text>
        <Typography.Text type="secondary">
          {moment(commitDate).fromNow()}
        </Typography.Text>
      </Space>
    </Space>
  );
};

export default RepoHeader;
