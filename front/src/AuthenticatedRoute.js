export default function AuthenticatedRoute({ component: C, appProps, ...rest }) {
    return (
      <Route
        {...rest}
        render={props =>
          appProps.isAuthenticated
            ? <C {...props} {...appProps} />
            : <Redirect
                to={`/login?redirect=${props.location.pathname}${props.location.search}`}
              />}
      />
    );
  }