package learn.plantbase.security;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.context.annotation.Bean;
//import org.springframework.http.HttpMethod;
//import org.springframework.security.authentication.AuthenticationManager;
//import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
//import org.springframework.security.config.annotation.web.builders.HttpSecurity;
//import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
//import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
//import org.springframework.security.config.http.SessionCreationPolicy;
//import org.springframework.security.core.userdetails.User;
//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
//import org.springframework.security.crypto.password.PasswordEncoder;

//@EnableWebSecurity
//public class SecurityConfig extends WebSecurityConfigurerAdapter {
//
//    @Override
//    @Bean
//    protected AuthenticationManager authenticationManager() throws Exception {
//        return super.authenticationManager();
//    }
//
//    @Autowired
//    private PasswordEncoder encoder;
//
//    @Override
//    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
////        User.UserBuilder userBuilder = User.withUsername("user")
////                .password("user").passwordEncoder(password -> encoder.encode(password))
////                .roles("USER");
////
////        User.UserBuilder adminBuilder = User.withUsername("admin")
////                .password("admin").passwordEncoder(password -> encoder.encode(password))
////                .roles("ADMIN");
//    }
//
//    @Bean
//    public PasswordEncoder getEncoder() {
//        return new BCryptPasswordEncoder();
//    }
//
//    @Override
//    protected void configure(HttpSecurity http) throws Exception {
//        http.csrf().disable();
//        http.cors();
//
//        // build antMatchers for each path in your controllers.
//        http.authorizeRequests()
//                .antMatchers("/authenticate").permitAll()
//                .antMatchers(HttpMethod.GET, "/api", /*Get by id*/ "/api/*").permitAll() // anybody is able to hit this endpoint
//                .antMatchers(HttpMethod.POST, "/api").hasAnyRole("USER", "ADMIN")
//                .antMatchers(HttpMethod.PUT, "/api").hasAnyRole("USER", "ADMIN")
//                .antMatchers(HttpMethod.DELETE, "/api/*").hasAnyRole("USER", "ADMIN")
//                .antMatchers("/**" /* any route in this path not explicitly defined above is denied */).denyAll()
//                .and()
//                .sessionManagement()
//                .sessionCreationPolicy(SessionCreationPolicy.STATELESS);
//    }
//}
