import { Avatar, Typography } from "antd";
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
    <div
      style={{
        justifyContent: "space-between",
        width: "100%",
        whiteSpace: "nowrap",
        display: "flex",
        alignItems: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          gap: "7px",
          alignItems: "center",
          maxWidth: "calc(100% - 200px)",
        }}
      >
        <Avatar src={avatar} style={{ flex: 1, maxWidth: "30px" }} />
        <Typography.Text>{login}</Typography.Text>
        <Typography.Text
          type="secondary"
          style={{ overflow: "hidden", flex: 1, textOverflow: "ellipsis" }}
          title={commitMessage}
        >
          {commitMessage}
        </Typography.Text>
      </div>
      <div
        style={{
          display: "flex",
          gap: "7px",
          alignItems: "center",
        }}
      >
        <Typography.Text code>{commitHash.substring(0, 8)}</Typography.Text>
        <Typography.Text type="secondary">
          {moment(commitDate).fromNow()}
        </Typography.Text>
      </div>
    </div>
  );
};

export default RepoHeader;
