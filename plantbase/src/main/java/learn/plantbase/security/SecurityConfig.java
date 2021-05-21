package learn.plantbase.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    private final JwtConverter converter;

    public SecurityConfig(JwtConverter converter) {
        this.converter = converter;
    }

    @Override
    @Bean
    protected AuthenticationManager authenticationManager() throws Exception {
        return super.authenticationManager();
    }
//
//    @Autowired
//    private PasswordEncoder encoder;

//    @Override
//    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
//        User.UserBuilder userBuilder = User.withUsername("user")
//                .password("user").passwordEncoder(password -> encoder.encode(password))
//                .roles("USER");
//
//        User.UserBuilder adminBuilder = User.withUsername("admin")
//                .password("admin").passwordEncoder(password -> encoder.encode(password))
//                .roles("ADMIN");
//
//        auth.inMemoryAuthentication()
//                .withUser(userBuilder)
//                .withUser(adminBuilder);
//    }

    @Bean
    public PasswordEncoder getEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.csrf().disable();
        http.cors();

        // build antMatchers for each path in your controllers.
        http.authorizeRequests()
                .antMatchers("/authenticate", "/create_account").permitAll()
                .antMatchers(HttpMethod.GET, "/api/plants", /*Get by id*/ "/api/plants/*", "/api/plants/byMyGarden/*").permitAll() // anybody is able to hit this endpoint
                .antMatchers(HttpMethod.POST, "/api/plants").hasAnyRole("USER", "ADMIN")
                .antMatchers(HttpMethod.PUT, "/api/plants/*").hasAnyRole("USER", "ADMIN")
                .antMatchers(HttpMethod.DELETE, "/api/plants/*").hasAnyRole("USER", "ADMIN")

                //my garden
                .antMatchers(HttpMethod.GET, "/api/my-garden", /*Get by id*/ "/api/my-garden/*", "/api/my-garden/from-user/*").permitAll() // anybody is able to hit this endpoint
                .antMatchers(HttpMethod.POST, "/api/my-garden").hasAnyRole("USER", "ADMIN")
                .antMatchers(HttpMethod.PUT, "/api/my-garden/*").hasAnyRole("USER", "ADMIN")
                .antMatchers(HttpMethod.DELETE, "/api/my-garden/*").hasAnyRole("USER", "ADMIN")

                //garden
                .antMatchers(HttpMethod.GET, "/api/garden", /*Get by id*/ "/api/garden/*").permitAll() // anybody is able to hit this endpoint

                //post
                .antMatchers(HttpMethod.GET, "/api/post", /*Get by id*/ "/api/post/*", "/api/post/user/*", "/api/post/plant/*").permitAll() // anybody is able to hit this endpoint
                .antMatchers(HttpMethod.POST, "/api/post").hasAnyRole("USER", "ADMIN")
                .antMatchers(HttpMethod.PUT, "/api/post/*").permitAll()
                .antMatchers(HttpMethod.DELETE, "/api/post/*").hasAnyRole("USER", "ADMIN")

                //reply
                .antMatchers(HttpMethod.GET, "/api/reply", /*Get by id*/ "/api/reply/*", "/api/reply/post/*").permitAll() // anybody is able to hit this endpoint
                .antMatchers(HttpMethod.POST, "/api/reply").permitAll()
                .antMatchers(HttpMethod.PUT, "/api/reply/*").permitAll()
                .antMatchers(HttpMethod.DELETE, "/api/reply/*").permitAll()

                //role
                .antMatchers(HttpMethod.GET, "/api/role", /*Get by id*/ "/api/role/*").permitAll() // anybody is able to hit this endpoint

                //user
                .antMatchers(HttpMethod.GET, "/api/user", /*Get by id*/ "/api/user/*").permitAll() // anybody is able to hit this endpoint
                .antMatchers(HttpMethod.POST, "/api/user").permitAll()
                .antMatchers(HttpMethod.PUT, "/api/user/*").permitAll()
                .antMatchers(HttpMethod.DELETE, "/api/user/*").permitAll()

                .antMatchers("/**" /* any route in this path not explicitly defined above is denied */).denyAll()
                .and()
                .addFilter(new JwtRequestFilter(authenticationManager(), converter))
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS);

    }
}
