import {
  Mock,
  afterAll,
  afterEach,
  beforeAll,
  describe,
  expect,
  test,
  vi,
} from "vitest";
import userEvent from "@testing-library/user-event";
import { render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import LoginPage from "./page";

import { setupServer } from "msw/node";
import { HttpResponse, delay, graphql } from "msw";
import { notification } from "antd";

const VALID_TOKEN = "token_valid_1";

const graphqlHandlers = [
  graphql.query("VIEWER_QUERY", async (params) => {
    await delay(100);
    const auth = params.request.headers.get("authorization");
    if (auth !== `Bearer ${VALID_TOKEN}`) {
      return HttpResponse.json(
        {},
        {
          status: 401,
        }
      );
    }
    return HttpResponse.json({
      data: { viewer: { login: "john1" } },
    });
  }),
];

const server = setupServer(...graphqlHandlers);

vi.mock("antd", async (importOriginal) => {
  const antd: object = await importOriginal();
  return {
    ...antd,
    notification: {
      error: vi.fn(),
      success: vi.fn(),
    },
  };
});

describe("Login page test", () => {
  afterEach(() => {
    server.resetHandlers();
  });
  afterAll(() => server.close());
  beforeAll(() => {
    server.listen({ onUnhandledRequest: "error" });
  });
  test("basic login", async () => {
    render(<LoginPage />, { wrapper: BrowserRouter });
    const event = userEvent.setup();

    const token = screen.getByTestId("login-token");
    expect(token).toBeInTheDocument();

    await event.type(token, "token123");

    const submit = screen.getByTestId("login-submit");

    await event.click(submit);
    expect(submit.innerHTML).toContain("anticon-loading");
    await waitFor(() => {
      expect(location.pathname).toBe("/");
    });

    await waitFor(() => {
      const errs = (notification.error as Mock).mock.calls;
      expect(errs.length).toBe(1);
      expect(errs[0][0].message).toContain("401");
    });
  });
});
