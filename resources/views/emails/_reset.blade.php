<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
        "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
    <title>Set up a new password for Modasti</title>
    <!--
    The style block is collapsed on page load to save you some scrolling.
    Postmark automatically inlines all CSS properties for maximum email client
    compatibility. You can just update styles here, and Postmark does the rest.
    -->
</head>
<body>
<span class="preheader">Use this link to reset your password. The link is only valid for 24 hours.</span>
<table class="email-wrapper" width="100%" cellpadding="0" cellspacing="0">
    <tr>
        <td align="center">
            <table class="email-content" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                    <td class="email-masthead">
                        <a href="{{asset('/')}}" class="email-masthead_name">
                            Modasti
                        </a>
                    </td>
                </tr>
                <!-- Email Body -->
                <tr>
                    <td class="email-body" width="100%" cellpadding="0" cellspacing="0">
                        <table class="email-body_inner" align="center" width="570" cellpadding="0" cellspacing="0">
                            <!-- Body content -->
                            <tr>
                                <td class="content-cell">
                                    <h1>Hi {{$user->first_name .' '. $user->last_name}},</h1>
                                    <p>You recently requested to reset your password for your Modasti account. Use the
                                        button below to reset it.
                                        <strong>This password reset is only valid for the next 24 hours.</strong>
                                    </p>
                                    <!-- Action -->
                                    <table class="body-action" align="center" width="100%" cellpadding="0"
                                           cellspacing="0">
                                        <tr>
                                            <td align="center">
                                                <!-- Border based button
                                           https://litmus.com/blog/a-guide-to-bulletproof-buttons-in-email-design -->
                                                <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                                    <tr>
                                                        <td align="center">
                                                            <table border="0" cellspacing="0" cellpadding="0">
                                                                <tr>
                                                                    <td>
                                                                        <a href="{{$url}}" class="button button--green"
                                                                           target="_blank">Reset your password</a>
                                                                    </td>
                                                                </tr>
                                                            </table>
                                                        </td>
                                                    </tr>
                                                </table>
                                            </td>
                                        </tr>
                                    </table>
                                    <p>Thanks,
                                        <br>The Modasti Team</p>
                                    <!-- Sub copy -->
                                    <table class="body-sub">
                                        <tr>
                                            <td>
                                                <p class="sub">If you’re having trouble with the button above, copy and
                                                    paste the URL below into your web browser.</p>
                                                <p class="sub">{{$url}}</p>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td>
                        <table class="email-footer" align="center" width="570" cellpadding="0" cellspacing="0">
                            <tr>
                                <td class="content-cell" align="center">
                                    <p class="sub align-center">&copy; {{date('Y')}} Modasti. All rights reserved.</p>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        </td>
    </tr>
</table>
</body>
</html>